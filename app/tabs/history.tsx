import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRTL } from '@/src/hooks';
import { Card } from '@/src/components/ui';

export default function HistoryScreen() {
  const { getTextAlign } = useRTL();
  
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <ScrollView className="flex-1 px-4 pt-16 pb-28">
        <Card className="mb-3">
          <Text className="text-lg font-semibold text-gray-900 mb-1" style={getTextAlign()}>
            No workouts yet
          </Text>
          <Text className="text-gray-500 text-sm" style={getTextAlign()}>
            Start your first workout to see your history
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}
