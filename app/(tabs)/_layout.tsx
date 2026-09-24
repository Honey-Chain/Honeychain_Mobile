import { Tabs } from "expo-router";

import {
  IconBell,
  IconBox,
  IconHome2,
  IconHexagon,
} from "@tabler/icons-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#D89A24",
        tabBarInactiveTintColor: "#78716C",

        tabBarStyle: {
          height: 64,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: "#E7E5E4",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <IconHome2 color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="hives"
        options={{
          title: "Hives",
          tabBarIcon: ({ color, size }) => (
            <IconHexagon color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <IconBell color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="batches"
        options={{
          title: "Batches",
          tabBarIcon: ({ color, size }) => (
            <IconBox color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}