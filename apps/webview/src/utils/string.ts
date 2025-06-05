export const convertPersonaTypeToImageName = (type: string) => {
  // 대문자 -> 소문자
  // _ -> -
  return type.toLowerCase().replaceAll('_', '-');
};

export const convertSnakeToKebab = (str: string) => {
  return str.replaceAll('_', '-');
};

export const convertKebabToSnake = (str: string) => {
  return str.replaceAll('-', '_');
};

export const convertCamelToSnake = (str: string) => {
  if (typeof str !== 'string') return str;

  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
};

// camel to kebab
export const convertCamelToKebab = (str: string) => {
  return convertCamelToSnake(str).replaceAll('_', '-');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertCamelObjToSnake = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const convertedKey = convertCamelToSnake(key);
    return { ...acc, [convertedKey]: value };
  }, {});
};

// camel to kebab kobj
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertCamelObjToKebab = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const convertedKey = convertCamelToKebab(key);
    return { ...acc, [convertedKey]: value };
  }, {});
};
