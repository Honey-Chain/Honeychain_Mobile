import axios from "axios";

import { getAccessToken } from "@/src/api/auth-storage";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});