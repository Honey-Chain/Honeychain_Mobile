import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  IconDroplet,
  IconTemperature,
  IconWeight,
} from "@tabler/icons-react-native";

import {
  getHiveTelemetry,
  TelemetryReading,
} from "@/src/api/endpoints/telemetry";

export default function HiveDetailsScreen() {
  const { hiveId } = useLocalSearchParams<{ hiveId: string }>();

  const [reading, setReading] =
    useState<TelemetryReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTelemetry() {
      if (!hiveId) return;

      try {
        const data = await getHiveTelemetry(hiveId);

        setReading(data[0] ?? null);
      } catch (error) {
        console.error("Failed to load telemetry:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTelemetry();
  }, [hiveId]);

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