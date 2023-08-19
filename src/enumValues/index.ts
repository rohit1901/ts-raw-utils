export function EnumValues<E extends Object>(e: E): E[keyof E][] {
  return Object.keys(e).map((key) => e[key as keyof typeof e]);
}
