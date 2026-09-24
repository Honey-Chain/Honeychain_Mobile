import { useAuth } from "@/src/providers/AuthProvider";
import { login } from "@/src/api/endpoints/auth";

import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { IconEye, IconEyeOff, IconHexagon } from "@tabler/icons-react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setToken } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await login({
        email: email.trim(),
        password,
      });

      await setToken(response.token);

      router.replace("/(tabs)/dashboard");
    } catch (error: any) {
      console.error(
        "Login failed:",
        error?.response?.data?.error?.message ?? error,
      );
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-stone-50 dark:bg-stone-950"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Brand */}
          <View className="mb-10 items-center">
            <View className="mb-5 h-16 w-16 items-center justify-center rounded-2xl bg-amber-500">
              <IconHexagon size={34} color="#FFFFFF" strokeWidth={1.8} />
            </View>

            <Text className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              Honey Chain
            </Text>

            <Text className="mt-2 text-center text-base text-stone-500 dark:text-stone-400">
              Smart beekeeping. Trusted honey.
            </Text>
          </View>

          {/* Form */}
          <View>
            <Text className="mb-2 text-sm font-semibold text-stone-700 dark:text-stone-300">
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="beekeeper@example.com"
              placeholderTextColor="#A8A29E"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              className="h-14 rounded-xl border border-stone-200 bg-white px-4 text-base text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
            />

            <Text className="mb-2 mt-5 text-sm font-semibold text-stone-700 dark:text-stone-300">
              Password
            </Text>

            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#A8A29E"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                className="h-14 rounded-xl border border-stone-200 bg-white px-4 pr-12 text-base text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
              />

              <Pressable
                onPress={() => setShowPassword((value) => !value)}
                className="absolute right-0 top-0 h-14 w-14 items-center justify-center"
              >
                {showPassword ? (
                  <IconEyeOff size={21} color="#78716C" />
                ) : (
                  <IconEye size={21} color="#78716C" />
                )}
              </Pressable>
            </View>

            <Pressable className="mt-3 self-end">
              <Text className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                Forgot password?
              </Text>
            </Pressable>

            <Pressable
              onPress={handleLogin}
              className="mt-7 h-14 items-center justify-center rounded-xl bg-amber-500 active:bg-amber-600"
            >
              <Text className="text-base font-bold text-white">Sign in</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="mt-10 items-center">
            <Text className="text-sm text-stone-500 dark:text-stone-400">
              Honey Chain Beekeeper Platform
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
