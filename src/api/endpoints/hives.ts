import { api } from "@/src/api/client";

export type Hive = {
  _id: string;
  hiveId?: string;
  name?: string;
  status?: string;
  healthScore?: number;
  location?: string;
  apiaryId?: string;
};

export async function getHives(): Promise<Hive[]> {
  const response = await api.get("/api/hives");

  return response.data.data ?? response.data;
}

export type CreateHivePayload = {
  hiveId: string;
  name?: string;
  location?: string;
  apiaryId?: string;
};

export async function createHive(
  payload: CreateHivePayload
): Promise<Hive> {
  const response = await api.post("/api/hives", payload);
  return response.data.data ?? response.data;
}

export async function updateHive(
  hiveId: string,
  payload: Partial<CreateHivePayload>
): Promise<Hive> {
  const response = await api.patch(`/api/hives/${hiveId}`, payload);
  return response.data.data ?? response.data;
}