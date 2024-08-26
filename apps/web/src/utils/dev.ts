import { SERVICE_MAINTAINER } from '@/constants/github';

export const checkIdDevAccessPossible = (username: string) => {
  return SERVICE_MAINTAINER.includes(username);
};
