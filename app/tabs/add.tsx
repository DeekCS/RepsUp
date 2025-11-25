import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRTL } from '@/src/hooks';
import { Button, Card } from '@/src/components/ui';

export default function AddScreen() {
  const { getTextAlign } = useRTL();
  
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <ScrollView className="flex-1 px-4 pt-16 pb-28">
        <Card className="mb-4">
          <Text className="text-xl font-bold text-gray-900 mb-2" style={getTextAlign()}>
            Quick Start
          </Text>
          <Text className="text-gray-600 mb-4" style={getTextAlign()}>
            Choose a workout type to get started
          </Text>
          <Button 
            title="Start Empty Workout" 
            onPress={() => console.log('Start workout')}
          />
        </Card>
      </ScrollView>
    </View>
  );
}
