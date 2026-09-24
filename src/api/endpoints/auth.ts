import { api } from "@/src/api/client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    organization?: {
      _id: string;
      name: string;
      role: string;
      walletAddress?: string;
    };
    walletAddress?: string;
  };
};

export async function login(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/api/auth/login",
    payload
  );

  return response.data;
}