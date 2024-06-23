export const objectKeys = <T extends { [key: string]: unknown }>(obj: T): Array<keyof T> => Object.keys(obj);
