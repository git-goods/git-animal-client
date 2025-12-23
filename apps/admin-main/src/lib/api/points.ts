import axios from "axios";

import { authUtils } from "../auth";

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
      "Admin-Secret": import.meta.env.VITE_APP_ADMIN_SECRET,
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
      "Admin-Secret": import.meta.env.VITE_APP_ADMIN_SECRET,
    },
  });
};

const axiosAdminInstance = axios.create({
  baseURL: "https://api.gitanimals.org",
  timeout: 15000,
  headers: {
    "Admin-Secret": import.meta.env.VITE_APP_ADMIN_SECRET,
  },
});

axiosAdminInstance.interceptors.request.use((config) => {
  config.headers["Admin-Secret"] = import.meta.env.VITE_APP_ADMIN_SECRET;
  const token = authUtils.getToken();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const increaseUserPointAdmin = async (username: string, data: PointChangeRequest) => {
  return axiosAdminInstance.post<PointChangeResponse>(
    `/admin/users/points/increase/by-username/${username}`,
    data,
  );
};
