import { SERVICE_MAINTAINER } from '@/shared/config/github';

export const checkIdDevAccessPossible = (username: string) => {
  return SERVICE_MAINTAINER.includes(username);
};
