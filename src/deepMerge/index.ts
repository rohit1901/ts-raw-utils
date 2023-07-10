export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const sourceValue = source[key];
            const targetValue = target[key];

            if (isObject(sourceValue) && isObject(targetValue)) {
                target[key] = deepMerge(targetValue, sourceValue as Partial<typeof targetValue>);
            } else {
                target[key] = mergeValue(sourceValue);
            }
        }
    }
    return target;
}

// Rest of the code remains the same

function mergeValue(value: any): any {
    const handlers: Record<string, () => any> = {
        object: () => deepMerge({}, value),
        default: () => value,
    };

    const valueType = isObject(value) ? 'object' : 'default';
    return handlers[valueType]();
}

function isObject(value: any): value is Record<string, any> {
    return typeof value === 'object' && value !== null;
}
