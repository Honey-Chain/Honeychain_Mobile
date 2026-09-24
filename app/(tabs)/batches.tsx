import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { IconBox } from "@tabler/icons-react-native";

import { getBatches, Batch } from "@/src/api/endpoints/batches";
import { router } from "expo-router";

export default function BatchesScreen() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBatches() {
      try {
        const data = await getBatches();
        setBatches(data);
      } catch (error) {
        console.error("Failed to load batches:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBatches();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-stone-50 dark:bg-stone-950"
      contentContainerClassName="px-5 pb-8 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-bold text-stone-950 dark:text-stone-50">
        Honey Batches
      </Text>

      <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        Track your harvested honey.
      </Text>

      <View className="mt-6 gap-3">
        {loading ? (
          <Text className="text-stone-500">Loading batches...</Text>
        ) : batches.length === 0 ? (
          <View className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
            <IconBox size={24} color="#D89A24" />

            <Text className="mt-3 font-semibold text-stone-900 dark:text-stone-100">
              No batches yet
            </Text>

            <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Harvested honey batches will appear here.
            </Text>
          </View>
        ) : (
          batches.map((batch) => (
            <Pressable
              key={batch._id}
              onPress={() =>
                router.push(`/batch/${batch.batchId ?? batch._id}`)
              }
              className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
            >
              <View className="flex-row items-center">
                {/* existing content */}
              </View>

              {batch.quantity != null && (
                <Text className="mt-4 text-sm text-stone-600 dark:text-stone-300">
                  Quantity: {batch.quantity} kg
                </Text>
              )}
            </Pressable>
          ))
        )}
      </View>
    </ScrollView>
  );
}
