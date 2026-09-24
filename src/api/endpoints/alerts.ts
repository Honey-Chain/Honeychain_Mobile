import { api } from "@/src/api/client";

export type Alert = {
  _id: string;
  hiveId?: string;
  type?: string;
  severity?: string;
  title?: string;
  message?: string;
  resolved?: boolean;
  createdAt?: string;
};

export async function getAlerts(): Promise<Alert[]> {
  const response = await api.get("/api/alerts");
  return response.data.data ?? response.data;
}

export async function resolveAlert(id: string): Promise<void> {
  await api.patch(`/api/alerts/${id}/resolve`);
}