import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react-native";

import { getAlerts, resolveAlert, Alert } from "@/src/api/endpoints/alerts";

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error("Failed to load alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      await resolveAlert(id);
      setAlerts((current) => current.filter((alert) => alert._id !== id));
    } catch (error) {
      console.error("Failed to resolve alert:", error);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-stone-50 dark:bg-stone-950"
      contentContainerClassName="px-5 pb-8 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-bold text-stone-950 dark:text-stone-50">
        Alerts
      </Text>

      <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        Monitor hive conditions that need attention.
      </Text>

      <View className="mt-6 gap-3">
        {loading ? (
          <Text className="text-stone-500">Loading alerts...</Text>
        ) : alerts.length === 0 ? (
          <View className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
            <IconCheck size={24} color="#16A34A" />

            <Text className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
              No active alerts
            </Text>

            <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Your hives are currently within expected ranges.
            </Text>
          </View>
        ) : (
          alerts.map((alert) => (
            <View
              key={alert._id}
              className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
            >
              <View className="flex-row items-start">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950">
                  <IconAlertTriangle size={21} color="#DC2626" />
                </View>

                <View className="ml-3 flex-1">
                  <Text className="font-semibold text-stone-900 dark:text-stone-100">
                    {alert.title ?? "Hive Alert"}
                  </Text>

                  <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {alert.message ?? "A hive condition needs attention."}
                  </Text>

                  {alert.hiveId && (
                    <Text className="mt-2 text-xs text-stone-400">
                      Hive: {alert.hiveId}
                    </Text>
                  )}
                </View>
              </View>

              <Pressable
                onPress={() => handleResolve(alert._id)}
                className="mt-4 rounded-xl bg-stone-900 px-4 py-3 dark:bg-stone-100"
              >
                <Text className="text-center font-semibold text-white dark:text-stone-900">
                  Mark as resolved
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
