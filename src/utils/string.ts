export const convertPersonaTypeToImageName = (type: string) => {
  // 대문자 -> 소문자
  // _ -> -
  return type.toLowerCase().replaceAll('_', '-');
};
