import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '@/src/components/ui';
import { LanguageSwitcher } from '@/src/components/features/LanguageSwitcher';
import { ScrollContainer } from '@/src/components/layout';

export default function WorkoutsScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <ScrollContainer>
        <Card className="mb-6">
          <LanguageSwitcher />
          <Text className="text-2xl text-gray-900 mb-2" style={{ textAlign: 'left' }}>
            Start Your First Workout
          </Text>
          <Text className="text-base text-gray-500 mb-5 leading-6" style={{ textAlign: 'left' }}>
            Track your exercises, sets, and reps to monitor your progress.
          </Text>
          <Button 
            title="New Workout" 
            onPress={() => console.log('Create workout')}
          />
        </Card>
        
        <Text className="text-xl text-gray-900 mb-4" style={{ textAlign: 'left' }}>
          Recent Workouts
        </Text>
        
        <Card className="mb-3">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg text-gray-900" style={{ textAlign: 'left' }}>
                Push Day
              </Text>
              <Text className="text-gray-500 text-sm mt-1" style={{ textAlign: 'left' }}>
                Today • 45 min
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#D1D5DB" />
          </View>
        </Card>
      </ScrollContainer>
    </View>
  );
}
