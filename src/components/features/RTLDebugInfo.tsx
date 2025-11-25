import React from 'react';
import { View, Text, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';

/**
 * Debug component to show current RTL state
 * Useful for troubleshooting RTL issues
 */
export const RTLDebugInfo: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <View className="p-4 bg-gray-100 rounded-lg my-4">
      <Text className="font-bold text-lg mb-2">RTL Debug Info:</Text>
      <Text>• Current Language: {i18n.language}</Text>
      <Text>• I18nManager.isRTL: {I18nManager.isRTL ? '✅ TRUE (RTL)' : '❌ FALSE (LTR)'}</Text>
      <Text>• Expected: {i18n.language === 'ar' ? 'RTL' : 'LTR'}</Text>
      <Text className="mt-2 text-sm text-gray-600">
        {I18nManager.isRTL !== (i18n.language === 'ar') 
          ? '⚠️ Mismatch! Please KILL and RESTART the app completely.' 
          : '✅ RTL state matches language'}
      </Text>
    </View>
  );
};
