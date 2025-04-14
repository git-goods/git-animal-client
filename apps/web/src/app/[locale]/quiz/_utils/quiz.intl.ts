export const customT = (text: string, values: Record<string, any>) => {
  return text.replace(/\[([^\]]+)\]/g, (match, p1) => {
    return values[p1] || match;
  });
};
