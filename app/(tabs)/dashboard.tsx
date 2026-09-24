import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  IconBell,
  IconChevronRight,
  IconCloudCheck,
  IconDroplet,
  IconHexagon,
  IconMoon,
  IconSun,
  IconTemperature,
  IconWeight,
} from "@tabler/icons-react-native";

import { useColorScheme } from "nativewind";

export default function DashboardScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <ScrollView
      className="flex-1 bg-stone-50 dark:bg-stone-950"
      contentContainerClassName="px-5 pb-8 pt-14"
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
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-stone-900"
          >
            <IconBell
              size={20}
              color={isDark ? "#F5F5F4" : "#292524"}
            />
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
            <Text className="text-sm text-stone-400">
              Hive health
            </Text>

            <Text className="mt-2 text-4xl font-bold text-white">
              92
            </Text>

            <Text className="mt-1 text-sm text-stone-400">
              Healthy · 8 monitored hives
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
          icon={<IconTemperature size={20} color="#D89A24" />}
          label="Temperature"
          value="34.2°C"
        />

        <MetricCard
          icon={<IconDroplet size={20} color="#60A5FA" />}
          label="Humidity"
          value="61%"
        />
      </View>

      <View className="mb-6 flex-row gap-3">
        <MetricCard
          icon={<IconWeight size={20} color="#A78BFA" />}
          label="Hive weight"
          value="42.8 kg"
        />

        <MetricCard
          icon={<IconHexagon size={20} color="#4ADE80" />}
          label="Active hives"
          value="8 / 8"
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

          <IconChevronRight
            size={16}
            color={isDark ? "#E6B34A" : "#B87918"}
          />
        </Pressable>
      </View>

      <View className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <Text className="font-semibold text-stone-900 dark:text-stone-100">
          No critical alerts
        </Text>

        <Text className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Your hives are currently within expected ranges.
        </Text>
      </View>
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