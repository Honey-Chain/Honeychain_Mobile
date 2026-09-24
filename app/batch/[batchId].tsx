import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { IconQrcode } from "@tabler/icons-react-native";

import { getBatch, getBatchQr, Batch } from "@/src/api/endpoints/batches";

export default function BatchDetailsScreen() {
  const { batchId } = useLocalSearchParams<{ batchId: string }>();

  const [batch, setBatch] = useState<Batch | null>(null);
  const [qr, setQr] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBatch() {
      if (!batchId) return;

      try {
        const [batchData, qrData] = await Promise.all([
          getBatch(batchId),
          getBatchQr(batchId),
        ]);

        setBatch(batchData);
        setQr(qrData);
      } catch (error) {
        console.error("Failed to load batch:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBatch();
  }, [batchId]);

  return (
    <ScrollView
      className="flex-1 bg-stone-50 dark:bg-stone-950"
      contentContainerClassName="px-5 pb-8 pt-14"
    >
      <Text className="text-2xl font-bold text-stone-950 dark:text-stone-50">
        Batch Details
      </Text>

      {loading ? (
        <Text className="mt-6 text-stone-500">Loading batch...</Text>
      ) : !batch ? (
        <Text className="mt-6 text-stone-500">Batch not found.</Text>
      ) : (
        <>
          <View className="mt-6 rounded-3xl bg-stone-900 p-5 dark:bg-stone-800">
            <Text className="text-sm text-stone-400">Batch ID</Text>

            <Text className="mt-2 text-xl font-bold text-white">
              {batch.batchId ?? batch._id}
            </Text>

            <Text className="mt-4 text-sm text-stone-400">Status</Text>

            <Text className="mt-1 font-semibold text-white">
              {batch.status ?? "Unknown"}
            </Text>

            {batch.quantity != null && (
              <>
                <Text className="mt-4 text-sm text-stone-400">Quantity</Text>

                <Text className="mt-1 font-semibold text-white">
                  {batch.quantity} kg
                </Text>
              </>
            )}
          </View>

          <View className="mt-5 items-center rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
            <IconQrcode size={32} color="#D89A24" />

            <Text className="mt-3 text-lg font-bold text-stone-900 dark:text-stone-100">
              Digital Honey Passport
            </Text>

            <Text className="mt-1 text-center text-sm text-stone-500 dark:text-stone-400">
              QR verification data is ready for this batch.
            </Text>

            <Text className="mt-4 text-center text-xs text-stone-400">
              {qr?.url ?? qr?.qrCode ?? "QR data available"}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}
