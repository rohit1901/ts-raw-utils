//Flattens an array
export function flattenArray<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
    return result;
  }, []);
}
