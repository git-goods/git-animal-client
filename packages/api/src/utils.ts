const convertCamelToKebab = (str: string) => {
  if (typeof str !== 'string') return str;

  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

export const convertCamelObjToKebab = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const convertedKey = convertCamelToKebab(key);
    return { ...acc, [convertedKey]: value };
  }, {});
};
