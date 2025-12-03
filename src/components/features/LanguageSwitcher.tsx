import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../lib/LocalizationProvider';

interface LanguageSwitcherProps {
  variant?: 'inline' | 'dropdown';
  className?: string;
}

/**
 * Language Switcher Component
 * Allows users to switch between English and Arabic
 * Uses LocalizationProvider which handles RTL restart properly
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'inline',
  className = '' 
}) => {
  const { t } = useTranslation();
  const { language: currentLang, changeLanguage } = useLocalization();

  const handleLanguageChange = async (lang: 'en' | 'ar') => {
    if (lang !== currentLang) {
      await changeLanguage(lang);
    }
  };

  if (variant === 'inline') {
    return (
      <View className={`flex-row items-center gap-2 ${className}`}>
        <TouchableOpacity
          onPress={() => handleLanguageChange('en')}
          className={`px-4 py-2 rounded-lg ${
            currentLang === 'en' ? 'bg-primary' : 'bg-gray-200'
          }`}
        >
          <Text className={`font-medium ${
            currentLang === 'en' ? 'text-white' : 'text-gray-700'
          }`}>
            {t('settings.english')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleLanguageChange('ar')}
          className={`px-4 py-2 rounded-lg ${
            currentLang === 'ar' ? 'bg-primary' : 'bg-gray-200'
          }`}
        >
          <Text className={`font-medium ${
            currentLang === 'ar' ? 'text-white' : 'text-gray-700'
          }`}>
            {t('settings.arabic')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className={className}>
      <Text className="text-sm text-gray-600 mb-2">{t('settings.changeLanguage')}</Text>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => handleLanguageChange('en')}
          className={`flex-1 px-4 py-3 rounded-lg border ${
            currentLang === 'en' 
              ? 'bg-primary border-primary' 
              : 'bg-white border-gray-300'
          }`}
        >
          <Text className={`text-center font-medium ${
            currentLang === 'en' ? 'text-white' : 'text-gray-700'
          }`}>
            🇬🇧 {t('settings.english')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleLanguageChange('ar')}
          className={`flex-1 px-4 py-3 rounded-lg border ${
            currentLang === 'ar' 
              ? 'bg-primary border-primary' 
              : 'bg-white border-gray-300'
          }`}
        >
          <Text className={`text-center font-medium ${
            currentLang === 'ar' ? 'text-white' : 'text-gray-700'
          }`}>
            🇸🇦 {t('settings.arabic')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
