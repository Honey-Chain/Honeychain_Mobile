import { api } from "@/src/api/client";

export type HivePrediction = {
  healthScore?: number;
  riskLevel?: string;
  anomaly?: boolean;
  stressLevel?: string;
  recommendation?: string;
  createdAt?: string;
};

export async function getLatestPrediction(
  hiveId: string
): Promise<HivePrediction | null> {
  const response = await api.get(
    `/api/ml/latest/${hiveId}`
  );

  return response.data.data ?? response.data;
}

export async function predictHive(
  hiveId: string
): Promise<HivePrediction> {
  const response = await api.post(
    `/api/ml/predict/${hiveId}`
  );

  return response.data.data ?? response.data;
}