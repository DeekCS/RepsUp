import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useRTL } from '@/src/hooks';
import { Card } from '@/src/components/ui';
import { LanguageSwitcher } from '@/src/components/features/LanguageSwitcher';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { getTextAlign } = useRTL();
  
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-1 px-4 pt-16 pb-28">
        <Card className="mb-4">
          <Text className="text-xl font-bold text-gray-900 mb-4" style={getTextAlign()}>
            {t('profile.settings')}
          </Text>
          <View className="space-y-3">
            <View>
              <Text className="text-sm text-gray-500" style={getTextAlign()}>Name</Text>
              <Text className="text-lg text-gray-900 mt-1" style={getTextAlign()}>Guest User</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500" style={getTextAlign()}>Total Workouts</Text>
              <Text className="text-lg text-gray-900 mt-1" style={getTextAlign()}>0</Text>
            </View>
          </View>
        </Card>

        {/* Language Settings */}
        <Card className="mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-4" style={getTextAlign()}>
            {t('profile.language')}
          </Text>
          <LanguageSwitcher variant="dropdown" />
        </Card>
      </View>
    </View>
  );
}
