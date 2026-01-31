import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Card } from '@/src/components/ui';
import { ScreenContainer } from '@/src/components/layout';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <ScreenContainer safeTop safeBottom>
        <Card className="mb-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Settings
          </Text>
          <View className="space-y-3">
            <View>
              <Text className="text-sm text-gray-500">Name</Text>
              <Text className="text-lg text-gray-900 mt-1">Guest User</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Total Workouts</Text>
              <Text className="text-lg text-gray-900 mt-1">0</Text>
            </View>
          </View>
        </Card>
      </ScreenContainer>
    </View>
  );
}
