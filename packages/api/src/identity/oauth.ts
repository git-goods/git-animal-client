import { post } from '../_instance';

interface LoginAppleResponse {
  token: string;
}

interface LoginAppleRequest {
  accessToken: string;
  secretKey: string;
}

export const loginApple = async (request: LoginAppleRequest): Promise<LoginAppleResponse> => {
  const res = await post<LoginAppleResponse>(
    '/logins/oauth/apple',
    {
      accessToken: request.accessToken,
    },
    {
      headers: {
        'Login-Secret': request.secretKey,
      },
    },
  );
  return res;
};
