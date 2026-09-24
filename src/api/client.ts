import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ??
    "http://localhost:4000/api",

  timeout: 15_000,

  headers: {
    "Content-Type": "application/json",
  },
});

export function configureApiToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}