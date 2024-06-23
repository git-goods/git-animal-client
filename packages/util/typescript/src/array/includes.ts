export const includes = <T extends string>(values: ReadonlyArray<T>, x: string): x is T => {
  return values.includes(x as T);
};
