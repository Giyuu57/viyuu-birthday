// Tiny classnames combiner so we don't need a dependency for it.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
