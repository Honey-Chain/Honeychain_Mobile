import { api } from "@/src/api/client";

export type Batch = {
  _id: string;
  batchId?: string;
  status?: string;
  quantity?: number;
  createdAt?: string;
  origin?: string;
};

export async function getBatches(): Promise<Batch[]> {
  const response = await api.get("/api/batches");
  return response.data.data ?? response.data;
}

export async function getBatch(batchId: string): Promise<Batch> {
  const response = await api.get(`/api/batches/${batchId}`);
  return response.data.data ?? response.data;
}

export async function getBatchQr(batchId: string) {
  const response = await api.get(`/api/batches/${batchId}/qr`);
  return response.data.data ?? response.data;
}