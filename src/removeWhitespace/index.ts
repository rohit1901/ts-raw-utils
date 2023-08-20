/**
 * Removes all whitespace from a string using regular expressions and returns the result
 * @param input - The string to remove whitespace from
 */
export function removeWhitespace(input: string): string {
  // Remove spaces, tabs, and line breaks using regular expressions
  return input.replace(/\s/g, "");
}
