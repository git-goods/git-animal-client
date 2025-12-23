import { api } from "./instance";

interface LoginAppleResponse {
  token: string;
}

interface LoginAppleRequest {
  accessToken: string;
  secretKey: string;
}

export const loginApple = async (request: LoginAppleRequest): Promise<LoginAppleResponse> => {
  return api.post<LoginAppleResponse>("/logins/oauth/apple", {
    json: {
      accessToken: request.accessToken,
    },
    headers: {
      "Login-Secret": request.secretKey,
    },
  });
};
