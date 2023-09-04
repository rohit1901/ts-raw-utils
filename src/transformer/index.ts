import {intersection, uniqWith} from 'lodash';
import {
    createSourceFile,
    EnumDeclaration,
    InterfaceDeclaration,
    isEnumDeclaration,
    isInterfaceDeclaration,
    isIntersectionTypeNode,
    isLiteralTypeNode,
    isPropertySignature,
    isTypeAliasDeclaration,
    isTypeLiteralNode,
    isTypeReferenceNode,
    PropertySignature,
    ScriptTarget, SyntaxKind,
    TypeAliasDeclaration,
    TypeLiteralNode,
    TypeNode,
} from 'typescript';

type InferredTypes = {
    interfaces: InterfaceDeclaration[]; enums: EnumDeclaration[]; aliasDeclarations: TypeAliasDeclaration[];
}
type KeywordType =
    | SyntaxKind.BooleanKeyword
    | SyntaxKind.UndefinedKeyword
    | SyntaxKind.StringKeyword
    | SyntaxKind.NumberKeyword
    | SyntaxKind.BigIntKeyword
    | SyntaxKind.SymbolKeyword
    | SyntaxKind.ObjectKeyword
    | SyntaxKind.AnyKeyword
    | SyntaxKind.UnknownKeyword
    | SyntaxKind.NeverKeyword
    | SyntaxKind.VoidKeyword
    | SyntaxKind.KeyOfKeyword
    | SyntaxKind.NullKeyword
    | SyntaxKind.EnumKeyword
    | SyntaxKind.ThisKeyword
    | SyntaxKind.SuperKeyword
    | SyntaxKind.TrueKeyword
    | SyntaxKind.FalseKeyword
    | SyntaxKind.IntrinsicKeyword
    | SyntaxKind.ReadonlyKeyword
    | SyntaxKind.LiteralType
    | SyntaxKind.IndexedAccessType;
/**
 * Function checks if the provided SyntaxKind matches any keyword type.
 * @param kind - The kind property of the TypeScript TypeNode.
 */
const isKeyword = (kind: SyntaxKind): kind is KeywordType => {
    /**
     * Define an array of all keyword types.
     */
    const keywordTypes: SyntaxKind[] = [
        SyntaxKind.BooleanKeyword,
        SyntaxKind.UndefinedKeyword,
        SyntaxKind.StringKeyword,
        SyntaxKind.NumberKeyword,
        SyntaxKind.BigIntKeyword,
        SyntaxKind.SymbolKeyword,
        SyntaxKind.ObjectKeyword,
        SyntaxKind.AnyKeyword,
        SyntaxKind.UnknownKeyword,
        SyntaxKind.NeverKeyword,
        SyntaxKind.VoidKeyword,
        SyntaxKind.KeyOfKeyword,
        SyntaxKind.NullKeyword,
        SyntaxKind.EnumKeyword,
        SyntaxKind.ThisKeyword,
        SyntaxKind.SuperKeyword,
        SyntaxKind.TrueKeyword,
        SyntaxKind.FalseKeyword,
        SyntaxKind.IntrinsicKeyword,
        SyntaxKind.ReadonlyKeyword,
        SyntaxKind.LiteralType,
        SyntaxKind.IndexedAccessType,
    ];
    return keywordTypes.includes(kind);
}
/**
 * Checks if the provided TypeScript TypeNode is a keyword type or a literal type.
 * A keyword type refers to built-in TypeScript types like string, number, boolean, etc.
 * A literal type is a type that represents a specific value, such as string literals, numeric literals, etc.
 *
 * @param {any} kind - The kind property of the TypeScript TypeNode.
 * @returns {boolean} Returns true if the type is a keyword type or a literal type, otherwise false.
 */
const isKeywordType = (kind: any): boolean => {
    return isKeyword(kind) || isLiteralTypeNode(kind);
}
/**
 * Finds intersection types within a TypeScript code string.
 *
 * @param {string} code - The TypeScript code as a string.
 * @returns {InferredTypes} An object containing arrays of inferred types: interfaces, enums, aliasDeclarations, and intersectionTypes.
 */
const findIntersectionTypes = (code: string) => {
    const parsedFile = createSourceFile('', code, ScriptTarget.ES2015, true,);
    const aliasDeclarations = parsedFile.statements.filter(isTypeAliasDeclaration);
    const updatedAliasDeclarations: TypeAliasDeclaration[] = [];
    const interfaces = parsedFile.statements.filter(isInterfaceDeclaration);
    const enums = parsedFile.statements.filter(isEnumDeclaration);

    const intersectionTypes: TypeAliasDeclaration[] = [];
    intersectionTypes.push(...aliasDeclarations.filter(t => isIntersectionTypeNode(t.type)));
    aliasDeclarations.filter(t => !isIntersectionTypeNode(t.type))?.forEach(i => {
        updatedAliasDeclarations.push(i);
    });
    return {intersectionTypes, updatedAliasDeclarations, interfaces, enums};
};
/**
 * Creates inferred types from an intersection type alias declaration.
 *
 * @param {TypeAliasDeclaration} intersectionType - The intersection type alias declaration.
 * @param {InferredTypes} inferredTypes - An object containing arrays of inferred types.
 * @returns {Object} An object containing arrays of found interfaces, enums, types, and type literals.
 */
const createInferredTypes = (intersectionType: TypeAliasDeclaration, {
    interfaces, enums, aliasDeclarations
}: InferredTypes) => {
    const foundInterfaces: InterfaceDeclaration[] = [];
    const foundEnums: EnumDeclaration[] = [];
    const foundTypes: TypeAliasDeclaration[] = [];
    const foundTypeLiterals: TypeLiteralNode[] = [];
    if (isIntersectionTypeNode(intersectionType.type)) {
        const types = intersectionType.type.types;
        types.forEach(t => {
            if (isTypeReferenceNode(t)) {
                foundInterfaces.push(interfaces.find(i => i.name.escapedText === t.typeName.getText()));
                foundEnums.push(enums.find(e => e.name.escapedText === t.typeName.getText()));
                foundTypes.push(aliasDeclarations.find(ty => ty.name.escapedText === t.typeName.getText()))
            } else if (isTypeLiteralNode(t)) {
                foundTypeLiterals.push(t);
            }
        });
    }

    return {foundInterfaces, foundEnums, foundTypes, foundTypeLiterals};
};
/**
 * Finds the deepest properties within an interface, type alias, or type literal.
 *
 * @param {InterfaceDeclaration | undefined} interfaceDeclaration - The interface declaration.
 * @param {TypeAliasDeclaration | undefined} typeAlias - The type alias declaration.
 * @param {TypeLiteralNode | undefined} typeLiterals - The type literal node.
 * @returns {PropertySignature[]} An array of deepest PropertySignature nodes.
 */
const findDeepestProperties = (interfaceDeclaration?: InterfaceDeclaration, typeAlias?: TypeAliasDeclaration, typeLiterals?: TypeLiteralNode): PropertySignature[] => {
    const deepestProperties: PropertySignature[] = [];
    const processTypeNode = (property: PropertySignature, parentName?: string) => {
        const typeNode: TypeNode = property.type;
        if (isLiteralTypeNode(typeNode)) {
            deepestProperties.push(property);
        } else if (isKeywordType(typeNode.kind)) {
            deepestProperties.push(property);
        } else if (isTypeReferenceNode(typeNode)) {
            deepestProperties.push(property);
        } else if (isTypeLiteralNode(typeNode)) {
            typeNode.members.forEach(member => {
                if (isPropertySignature(member)) {
                    processTypeNode(member, parentName);
                }
            });
        }
    };
    interfaceDeclaration?.members.forEach(member => {
        if (isPropertySignature(member)) {
            processTypeNode(member, interfaceDeclaration.name.getText());
        }
    });
    if (typeLiterals && isTypeLiteralNode(typeLiterals)) typeLiterals?.members.forEach(member => {
        if (isPropertySignature(member)) {
            processTypeNode(member);
        }
    });
    return deepestProperties;
};
/**
 * Finds the deepest property within a type alias.
 *
 * @param {TypeAliasDeclaration} type - The type alias declaration.
 * @returns {PropertySignature[]} An array of deepest PropertySignature nodes.
 */
const findDeepestPropertyInType = (type: TypeAliasDeclaration) => {
    return (findDeepestProperties(undefined, type));
};
/**
 * Finds the deepest property within a type literal node.
 *
 * @param {TypeLiteralNode} type - The type literal node.
 * @returns {PropertySignature[]} An array of deepest PropertySignature nodes.
 */
const findDeepestPropertyInTypeLiteral = (type: TypeLiteralNode) => {
    return (findDeepestProperties(undefined, undefined, type));
};
/**
 * Finds the deepest property within an interface.
 *
 * @param {InterfaceDeclaration} interfaceDeclaration - The interface declaration.
 * @returns {PropertySignature[]} An array of deepest PropertySignature nodes.
 */
const findDeepestPropertyInInterface = (interfaceDeclaration: InterfaceDeclaration) => {
    return (findDeepestProperties(interfaceDeclaration));
};
/**
 * Infers the common properties from an array of PropertySignature arrays.
 *
 * @param {PropertySignature[][]} inferredProperties - An array of arrays of PropertySignature nodes.
 * @returns {PropertySignature[] | undefined} An array of common PropertySignature nodes or undefined if no common properties are found.
 */
const infer = (inferredProperties: PropertySignature[][]): PropertySignature[] | undefined => {
    const texts = inferredProperties.map(ip => ip.map(i => i.getText()));
    const filteredTexts = texts.filter(t => t.length > 0);
    const foundText: string[] = intersection(...filteredTexts);
    const foundProperties: PropertySignature[] = [];
    foundText.forEach(t => {
        foundProperties.push(...inferredProperties.find(ip => ip.map(i => i.getText() === t)));
    });
    if (foundProperties.length > 0) return foundProperties;
    return;
};
/**
 * Transforms an intersection type alias declaration into a type guard signature.
 *
 * @param {TypeAliasDeclaration} intersectionType - The intersection type alias declaration.
 * @param {InferredTypes} inferredTypes - An object containing arrays of inferred types.
 * @returns {string | undefined} The type guard signature or undefined if no common properties are found.
 */
const transformIntersectionType = (intersectionType: TypeAliasDeclaration, {
    interfaces, enums, aliasDeclarations
}: InferredTypes): string | undefined => {
    const inferredTypes = createInferredTypes(intersectionType, {interfaces, enums, aliasDeclarations});
    const inferredProperties: PropertySignature[][] = [];
    // Inferred types could wither be interfaces, enums or type aliases
    inferredTypes.foundInterfaces.forEach(i => {
        const inferredProperty: PropertySignature[] = findDeepestPropertyInInterface(i);
        inferredProperties.push(inferredProperty);
    });
    inferredTypes.foundTypes.forEach(i => {
        const inferredProperty: PropertySignature[] = findDeepestPropertyInType(i);
        inferredProperties.push(inferredProperty);
    });
    inferredTypes.foundTypeLiterals.forEach(i => {
        const inferredProperty: PropertySignature[] = findDeepestPropertyInTypeLiteral(i);
        inferredProperties.push(inferredProperty);
    });
    const foundProperties = uniqWith(infer(inferredProperties), (arrTh, oth) => arrTh.getText() === oth.getText());
    if (!foundProperties) return;
    return `${buildTypeParametersSignature(intersectionType)} = {\n${foundProperties.map(fp => fp.getText()).join('\n')}}`;
};
/**
 * Gets the constraint text from a TypeNode.
 * @example
 * // For a generic type `Array<T extends K>`
 * Result: K
 * @param constraint
 */
const getConstraintText = (constraint: TypeNode) => {
    if (isTypeReferenceNode(constraint)) {
        return constraint.typeName.getText();
    }
    return constraint.getText();
};
/**
 * Builds the generic function signature for a generic type guard. This is used to generate the type guard signature.
 * @example
 * // For a generic type `Array<T extends K>`
 * Result: export type Array<T extends K>
 * @param intersectionType - The intersection type alias declaration.
 */
const buildTypeParametersSignature = (intersectionType: TypeAliasDeclaration) => {
    const typeParameters = intersectionType.typeParameters;
    const baseText = `export type ${intersectionType.name.escapedText}`;
    if (!typeParameters) return baseText;
    const typeParametersList = typeParameters
        ?.map(p => `${p.name.getText()} ${p.constraint ? 'extends ' + getConstraintText(p.constraint) : ''}`,)
        .join(',');
    return `${baseText}<${typeParametersList}>`;
};
/**
 * Transforms TypeScript intersection types within a given code string.
 *
 * @param {string} strings - The TypeScript code as a string.
 * @returns {string} The transformed TypeScript code.
 */
export const transformer = (strings: string) => {
    const transformedTypes = [];
    const {intersectionTypes, updatedAliasDeclarations, interfaces, enums} = findIntersectionTypes(strings);
    transformedTypes.push(updatedAliasDeclarations.map(ad => ad.getText()).join('\n'), interfaces.map(i => i.getText()).join('\n'), enums.map(e => e.getText()).join('\n'));
    intersectionTypes.forEach(i => {
        transformedTypes.push(transformIntersectionType(i, {interfaces, enums, aliasDeclarations: updatedAliasDeclarations}));
    });
    return transformedTypes.join('\n');
};
// Usage:
// transformer(IntersectionType);