import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Card } from '@/src/components/ui';
import { ScrollContainer } from '@/src/components/layout';

export default function HistoryScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <ScrollContainer>
        <Card className="mb-3">
          <Text className="text-lg  text-left font-semibold text-gray-900 mb-1">
جدولك          </Text>
          <Text className="text-gray-500 text-left text-sm">
            لم تقم بأي تمارين بعد. ابدأ أول تمرين لك الآن!
          </Text>
        </Card>
      </ScrollContainer>
    </View>
  );
}
