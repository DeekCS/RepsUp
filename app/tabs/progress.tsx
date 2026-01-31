import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Container } from '@/src/components/layout';

export default function ProgressScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <Container centered paddingTop={64} paddingBottom={112}>
        <Text className="text-xl font-bold text-gray-800">Coming Soon</Text>
        <Text className="mt-2 text-gray-600 text-center">
          View your workout statistics and progress charts
        </Text>
      </Container>
    </View>
  );
}
