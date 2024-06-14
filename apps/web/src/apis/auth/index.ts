import { get } from '..';

export const login = (jwt: string) => get('/logins/oauth/github/tokens?code=' + jwt);
