import {UnionToIntersection} from "../";
// Utility function: unionToIntersection
describe('UnionToIntersection', () => {
    interface ExampleInterface1 {
        prop1: string;
    }

    interface ExampleInterface2 {
        prop2: number;
    }

    it('should convert a union of types to an intersection of types', () => {
        type UnionType = ExampleInterface1 | ExampleInterface2;
        type IntersectionType = UnionToIntersection<UnionType>;

        const obj: IntersectionType = {
            prop1: 'value',
            prop2: 123,
        };

        expect(obj.prop1).toBe('value');
        expect(obj.prop2).toBe(123);
    });
});