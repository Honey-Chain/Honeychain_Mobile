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