import { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  IconChevronRight,
  IconHexagon,
  IconPlus,
} from "@tabler/icons-react-native";
import { router } from "expo-router";

import { getHives, Hive } from "@/src/api/endpoints/hives";

export default function HivesScreen() {
  const [hives, setHives] = useState<Hive[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadHives() {
      try {
        const data = await getHives();
        setHives(data);
      } catch (error) {
        console.error("Failed to load hives:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHives();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      const data = await getHives();
      setHives(data);
    } catch (error) {
      console.error("Failed to refresh hives:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-stone-50 dark:bg-stone-950"
      contentContainerClassName="px-5 pb-8 pt-14"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-7 flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-medium text-stone-500 dark:text-stone-400">
            Apiary
          </Text>

          <Text className="mt-1 text-2xl font-bold text-stone-950 dark:text-stone-50">
            Your Hives
          </Text>
        </View>

        <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-stone-900 dark:bg-honey-500">
          <IconPlus size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Summary */}
      <View className="mb-6 rounded-3xl bg-stone-900 p-5 dark:bg-stone-800">
        <Text className="text-sm text-stone-400">Total hives</Text>

        <Text className="mt-2 text-4xl font-bold text-white">
          {loading ? "—" : hives.length}
        </Text>

        <Text className="mt-1 text-sm text-stone-400">
          {loading
            ? "Loading hive data..."
            : `${hives.length} hives registered`}
        </Text>
      </View>

      {/* Hive list */}
      <Text className="mb-3 text-lg font-bold text-stone-950 dark:text-stone-50">
        All hives
      </Text>

      {loading ? (
        <View className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <Text className="text-sm text-stone-500 dark:text-stone-400">
            Loading hives...
          </Text>
        </View>
      ) : hives.length === 0 ? (
        <View className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <Text className="font-semibold text-stone-900 dark:text-stone-100">
            No hives found
          </Text>

          <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Add your first hive to start monitoring it.
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          {hives.map((hive) => (
            <Pressable
              key={hive._id}
              onPress={() => router.push(`/hive/${hive._id}`)}
              className="flex-row items-center rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
            >
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-honey-100 dark:bg-stone-800">
                <IconHexagon size={22} color="#D89A24" />
              </View>

              <View className="ml-3 flex-1">
                <Text className="font-semibold text-stone-900 dark:text-stone-100">
                  {hive.name ?? hive.hiveId ?? "Unnamed Hive"}
                </Text>

                <Text className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  {hive.status ?? "Unknown status"}
                </Text>
              </View>

              <IconChevronRight size={18} color="#A8A29E" />
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
