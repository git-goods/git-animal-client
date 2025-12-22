import { api } from "./instance";

export interface PointChangeRequest {
  point: number;
  reason: string;
}

export interface PointChangeResponse {
  success: boolean;
  message?: string;
}

export const increaseUserPoint = async (
  username: string,
  data: PointChangeRequest,
): Promise<PointChangeResponse> => {
  return api.post<PointChangeResponse>(`admin/users/points/increase/by-username/${username}`, {
    json: data,
    headers: {
      "Admin-Secret": import.meta.env.VITE_ADMIN_SECRET,
    },
  });
};

export const decreaseUserPoint = async (
  username: string,
  data: PointChangeRequest,
): Promise<PointChangeResponse> => {
  return api.post<PointChangeResponse>(`admin/users/points/decrease/by-username/${username}`, {
    json: data,
    headers: {
      "Admin-Secret": import.meta.env.VITE_ADMIN_SECRET,
    },
  });
};
