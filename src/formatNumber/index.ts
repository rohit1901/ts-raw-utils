// FormatNumber
export function formatNumber(
  num: number,
  options?: Intl.NumberFormatOptions,
): string {
  return num.toLocaleString(undefined, options);
}
