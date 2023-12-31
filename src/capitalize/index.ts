/**
 * Capitalize the first letter of a string
 * @param str - The string to capitalize
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Remove single and double quotes from a string
 * @param str - The string to escape
 */
export function getEscapedStringLiteral(str: string): string {
  return str.replace(/['"]/g, "");
}

/**
 * Capitalize the first letter of a string and remove single and double quotes
 * @param str - The string to capitalize and escape
 */
export function getEscapedCapitalizedStringLiteral(str: string): string {
  return capitalize(getEscapedStringLiteral(str));
}
