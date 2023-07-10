// UniqueArray
export function uniqueArray<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}