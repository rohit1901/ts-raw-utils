// FilterFalsy
export function filterFalsy<T>(arr: T[]): T[] {
  return arr.filter(Boolean);
}
