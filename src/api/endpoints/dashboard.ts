import { api } from "@/src/api/client";

export type DashboardData = {
  hives: {
    total: number;
    active: number;
    inactive: number;
    healthy: number;
    averageHealthScore: number;
  };
  alerts: {
    active: number;
    critical: number;
    warning: number;
    info: number;
  };
  batches: {
    total: number;
    created: number;
    inTransit: number;
    delivered: number;
    recalled: number;
    tested: number;
    totalQuantity: number;
  };
  harvests: {
    totalExtractions: number;
    totalGrams: number;
    totalKg: number;
  };
  telemetry: {
    totalReadings: number;
    activity24h: number;
  };
  ai: {
    totalPredictions: number;
    anomalies: number;
    highStress: number;
  };
};

export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get("/api/analytics/dashboard");

  return response.data.data ?? response.data;
}