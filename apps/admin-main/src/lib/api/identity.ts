import { queryOptions } from "@tanstack/react-query";

import { api } from "./instance";

interface GetUsersResponse {
  id: string;
  username: string;
  points: string;
  profileImage: string;
  entryPoint: "GITHUB" | "APPLE"; // GITHUB OR APPLE
}

export const getUsers = async (): Promise<GetUsersResponse> => {
  return api.get<GetUsersResponse>("users");
};

export const identityQueryOptions = {
  user: queryOptions({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  }),
};
