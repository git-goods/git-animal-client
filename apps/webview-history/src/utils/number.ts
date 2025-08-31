export const addNumberComma = (value: number | string) => {
  let num = value;
  if (typeof num === 'string') {
    num = parseInt(num);
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeNumberComma = (num: string) => {
  return num.replace(/,/g, '');
};
