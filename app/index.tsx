import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to login screen
    const timeout = setTimeout(() => {
      router.replace('/auth/login');
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View className="flex-1 bg-indigo-600 items-center justify-center">
      <StatusBar style="light" />
      <Text className="text-4xl font-bold text-white">RepsUp</Text>
      <Text className="text-white/80 mt-2">Loading...</Text>
    </View>
  );
}
