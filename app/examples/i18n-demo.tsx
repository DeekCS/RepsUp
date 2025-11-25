import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/src/components/features/LanguageSwitcher';
import { RTLDebugInfo } from '@/src/components/features/RTLDebugInfo';

/**
 * Example screen demonstrating i18n usage
 * This shows how to use translations in your components
 */
export default function I18nExample() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* RTL Debug Info */}
        <RTLDebugInfo />

        {/* Header */}
        <Text className="text-3xl 
        
          rtl:text-right ltr:text-left
        font-bold mb-4">
          {t('welcome')}
        </Text>

        {/* Language Switcher */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">
            {t('settings.changeLanguage')}
          </Text>
          <LanguageSwitcher variant="dropdown" />
        </View>

        {/* Common Translations */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">
            Common Translations
          </Text>
          <View className="space-y-2">
            <Text>• {t('common.login')}</Text>
            <Text>• {t('common.logout')}</Text>
            <Text>• {t('common.save')}</Text>
            <Text>• {t('common.cancel')}</Text>
            <Text>• {t('common.loading')}</Text>
          </View>
        </View>

        {/* Auth Translations */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">
            Auth Translations
          </Text>
          <View className="space-y-2">
            <Text>• {t('auth.login.title')}</Text>
            <Text>• {t('auth.login.subtitle')}</Text>
            <Text>• {t('auth.login.phoneNumber')}</Text>
            <Text>• {t('auth.login.continueButton')}</Text>
          </View>
        </View>

        {/* Tab Translations */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">
            Tab Translations
          </Text>
          <View className="space-y-2">
            <Text>• {t('tabs.home')}</Text>
            <Text>• {t('tabs.add')}</Text>
            <Text>• {t('tabs.history')}</Text>
            <Text>• {t('tabs.progress')}</Text>
            <Text>• {t('tabs.profile')}</Text>
          </View>
        </View>

        {/* Workout Translations */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">
            Workout Translations
          </Text>
          <View className="space-y-2">
            <Text>• {t('workout.title')}</Text>
            <Text>• {t('workout.addNew')}</Text>
            <Text>• {t('workout.exercise')}</Text>
            <Text>• {t('workout.sets')}</Text>
            <Text>• {t('workout.reps')}</Text>
            <Text>• {t('workout.weight')}</Text>
          </View>
        </View>

        {/* Profile Translations */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">
            Profile Translations
          </Text>
          <View className="space-y-2">
            <Text>• {t('profile.settings')}</Text>
            <Text>• {t('profile.language')}</Text>
            <Text>• {t('profile.theme')}</Text>
            <Text>• {t('profile.notifications')}</Text>
            <Text>• {t('profile.about')}</Text>
          </View>
        </View>

        {/* Example with interpolation */}
        <View className="mb-8 p-4 bg-blue-50 rounded-lg">
          <Text className="text-lg font-semibold mb-2">
            Interpolation Example
          </Text>
          <Text>
            {t('auth.verifyOtp.subtitle', { phone: '+962 79 123 4567' })}
          </Text>
        </View>

        {/* Tips */}
        <View className="p-4 bg-yellow-50 rounded-lg">
          <Text className="text-lg font-semibold mb-2">
            💡 Usage Tips
          </Text>
          <Text className="text-sm text-gray-700 leading-6">
            1. Use useTranslation() hook to access t function{'\n'}
            2. Keys are case-sensitive{'\n'}
            3. Use dot notation for nested keys{'\n'}
            4. Interpolation works with {'{{key}}'} syntax{'\n'}
            5. Check I18N_GUIDE.md for more details
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
