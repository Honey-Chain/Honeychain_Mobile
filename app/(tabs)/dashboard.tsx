import { useEffect, useState } from "react";
import { getDashboard, DashboardData } from "@/src/api/endpoints/dashboard";
import { useAuth } from "@/src/providers/AuthProvider";

import {
  RefreshControl,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  IconBell,
  IconChevronRight,
  IconCloudCheck,
  IconHexagon,
  IconMoon,
  IconSun,
} from "@tabler/icons-react-native";

import { useColorScheme } from "nativewind";

export default function DashboardScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const { signOut } = useAuth();

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Failed to refresh dashboard:", error);
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
            Good morning
          </Text>

          <Text className="mt-1 text-2xl font-bold text-stone-950 dark:text-stone-50">
            Your Apiary
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-stone-900">
            <IconBell size={20} color={isDark ? "#F5F5F4" : "#292524"} />
          </Pressable>

          <Pressable
            onPress={toggleColorScheme}
            className="h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-stone-900"
          >
            {isDark ? (
              <IconSun size={20} color="#F5F5F4" />
            ) : (
              <IconMoon size={20} color="#292524" />
            )}
          </Pressable>
        </View>
      </View>

      {/* Overview */}

      <View className="mb-6 rounded-3xl bg-stone-900 p-5 dark:bg-stone-800">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-stone-400">Hive health</Text>

            <Text className="mt-2 text-4xl font-bold text-white">
              {loading
                ? "—"
                : Math.round(dashboard?.hives.averageHealthScore ?? 0)}
            </Text>

            <Text className="mt-1 text-sm text-stone-400">
              {loading
                ? "Loading hive data..."
                : `${dashboard?.hives.healthy ?? 0} healthy · ${
                    dashboard?.hives.total ?? 0
                  } monitored hives`}
            </Text>
          </View>

          <View className="h-16 w-16 items-center justify-center rounded-full bg-honey-500">
            <IconHexagon size={30} color="#FFFFFF" />
          </View>
        </View>

        <View className="mt-5 flex-row items-center">
          <IconCloudCheck size={16} color="#86EFAC" />

          <Text className="ml-2 text-xs text-stone-300">
            All sensors synced
          </Text>
        </View>
      </View>

      {/* Metrics */}

      <View className="mb-6 flex-row gap-3">
        <MetricCard
          icon={<IconHexagon size={20} color="#D89A24" />}
          label="Healthy hives"
          value={loading ? "—" : String(dashboard?.hives.healthy ?? 0)}
        />

        <MetricCard
          icon={<IconBell size={20} color="#60A5FA" />}
          label="Active alerts"
          value={loading ? "—" : String(dashboard?.alerts.active ?? 0)}
        />
      </View>

      <View className="mb-6 flex-row gap-3">
        <MetricCard
          icon={<IconCloudCheck size={20} color="#A78BFA" />}
          label="AI predictions"
          value={loading ? "—" : String(dashboard?.ai.totalPredictions ?? 0)}
        />

        <MetricCard
          icon={<IconHexagon size={20} color="#4ADE80" />}
          label="Active hives"
          value={
            loading
              ? "—"
              : `${dashboard?.hives.active ?? 0} / ${dashboard?.hives.total ?? 0}`
          }
        />
      </View>

      {/* Alerts */}

      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-stone-950 dark:text-stone-50">
          Recent alerts
        </Text>

        <Pressable className="flex-row items-center">
          <Text className="text-sm font-semibold text-honey-600 dark:text-honey-400">
            View all
          </Text>

          <IconChevronRight size={16} color={isDark ? "#E6B34A" : "#B87918"} />
        </Pressable>
      </View>

      <View className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <Text className="font-semibold text-stone-900 dark:text-stone-100">
          {loading
            ? "Loading alerts..."
            : dashboard?.alerts.active
              ? `${dashboard.alerts.active} active alerts`
              : "No active alerts"}
        </Text>

        <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          {loading
            ? "Checking your hive activity."
            : `${dashboard?.alerts.critical ?? 0} critical · ${
                dashboard?.alerts.warning ?? 0
              } warnings`}
        </Text>

        <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          {loading
            ? "Checking your hive activity."
            : dashboard?.alerts.active
              ? "Review active alerts to take action."
              : "Your hives are currently within expected ranges."}
        </Text>
      </View>

      {/* Sign out */}
      <Pressable
        onPress={signOut}
        className="mt-6 rounded-xl border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-900"
      >
        <Text className="text-center font-semibold text-red-600">Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
      <View className="mb-3 h-9 w-9 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800">
        {icon}
      </View>

      <Text className="text-xs text-stone-500 dark:text-stone-400">
        {label}
      </Text>

      <Text className="mt-1 text-lg font-bold text-stone-950 dark:text-stone-50">
        {value}
      </Text>
    </View>
  );
}
