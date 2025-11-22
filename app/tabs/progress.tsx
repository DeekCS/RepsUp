import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProgressScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-1 items-center justify-center px-6 pt-16 pb-28">
        <Text className="text-xl font-bold text-gray-800">Coming Soon</Text>
        <Text className="mt-2 text-gray-600 text-center">
          View your workout statistics and progress charts
        </Text>
      </View>
    </View>
  );
}
