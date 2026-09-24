import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  IconDroplet,
  IconTemperature,
  IconWeight,
  IconBrain,
} from "@tabler/icons-react-native";
import {
  getLatestPrediction,
  predictHive,
  HivePrediction,
} from "@/src/api/endpoints/ml";

import {
  getHiveTelemetry,
  TelemetryReading,
} from "@/src/api/endpoints/telemetry";

export default function HiveDetailsScreen() {
  const { hiveId } = useLocalSearchParams<{ hiveId: string }>();

  const [reading, setReading] = useState<TelemetryReading | null>(null);
  const [loading, setLoading] = useState(true);

  const [prediction, setPrediction] = useState<HivePrediction | null>(null);

  const [predicting, setPredicting] = useState(false);

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    async function loadTelemetry() {
      if (!hiveId) return;

      try {
        const data = await getHiveTelemetry(hiveId);

        setReading(data[0] ?? null);
        setLastUpdated(new Date());
        const latestPrediction = await getLatestPrediction(hiveId);

        setPrediction(latestPrediction);
      } catch (error) {
        console.error("Failed to load telemetry:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTelemetry();
  }, [hiveId]);

  useEffect(() => {
    if (!hiveId) return;

    const interval = setInterval(async () => {
      try {
        const data = await getHiveTelemetry(hiveId);
        setReading(data[0] ?? null);
      } catch (error) {
        console.error("Telemetry refresh failed:", error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [hiveId]);

  const handlePrediction = async () => {
    if (!hiveId) return;

    try {
      setPredicting(true);

      const result = await predictHive(hiveId);

      setPrediction(result);
    } catch (error) {
      console.error("AI prediction failed:", error);
    } finally {
      setPredicting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-stone-50 dark:bg-stone-950"
      contentContainerClassName="px-5 pb-8 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-bold text-stone-950 dark:text-stone-50">
        Hive {hiveId}
      </Text>

      <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        Live telemetry
      </Text>

      {lastUpdated && (
        <Text className="mt-1 text-xs text-stone-400">
          Updated {lastUpdated.toLocaleTimeString()}
        </Text>
      )}

      <View className="mt-6 gap-3">
        <TelemetryCard
          icon={<IconTemperature size={22} color="#D89A24" />}
          label="Temperature"
          value={
            loading
              ? "—"
              : reading?.temperature != null
                ? `${reading.temperature}°C`
                : "No data"
          }
        />

        <TelemetryCard
          icon={<IconDroplet size={22} color="#60A5FA" />}
          label="Humidity"
          value={
            loading
              ? "—"
              : reading?.humidity != null
                ? `${reading.humidity}%`
                : "No data"
          }
        />

        <TelemetryCard
          icon={<IconWeight size={22} color="#A78BFA" />}
          label="Hive weight"
          value={
            loading
              ? "—"
              : reading?.weight != null
                ? `${reading.weight} kg`
                : "No data"
          }
        />
      </View>

      <View className="mt-6 rounded-3xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
        <View className="flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-honey-100 dark:bg-stone-800">
            <IconBrain size={22} color="#D89A24" />
          </View>

          <View className="ml-3">
            <Text className="font-semibold text-stone-900 dark:text-stone-100">
              AI Hive Intelligence
            </Text>

            <Text className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Latest hive health analysis
            </Text>
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-sm text-stone-500 dark:text-stone-400">
            Health score
          </Text>

          <Text className="mt-1 text-3xl font-bold text-stone-950 dark:text-stone-50">
            {prediction?.healthScore ?? "—"}
          </Text>

          <Text className="mt-2 text-sm text-stone-600 dark:text-stone-300">
            {prediction?.recommendation ??
              "No AI recommendation available yet."}
          </Text>

          <Pressable
            onPress={handlePrediction}
            disabled={predicting}
            className="mt-5 rounded-xl bg-honey-500 px-4 py-3"
          >
            <Text className="text-center font-semibold text-white">
              {predicting ? "Analyzing..." : "Run AI Analysis"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

function TelemetryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
      <View className="flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800">
          {icon}
        </View>

        <View className="ml-3">
          <Text className="text-xs text-stone-500 dark:text-stone-400">
            {label}
          </Text>

          <Text className="mt-1 text-xl font-bold text-stone-950 dark:text-stone-50">
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}
