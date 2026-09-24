import { api } from "@/src/api/client";

export type TelemetryReading = {
  _id?: string;
  hiveId: string;
  temperature?: number;
  humidity?: number;
  weight?: number;
  vibration?: number;
  timestamp: string;
};

export async function getHiveTelemetry(
  hiveId: string
): Promise<TelemetryReading[]> {
  const response = await api.get(
    `/api/iot/telemetry/${hiveId}`
  );

  return response.data.data ?? response.data;
}