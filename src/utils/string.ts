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
// Object.entries(request || {})
//         .map(([key, value]) => ({ convertSnakeToKebab(key): value }))
//         .join('&'),

export const convertCamelToSnake = (str: string) => {
  if (typeof str !== 'string') return str;

  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertCamelObjToSnake = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const convertedKey = convertCamelToSnake(key);
    return { ...acc, [convertedKey]: value };
  }, {});
};
