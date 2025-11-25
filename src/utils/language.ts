import { I18nManager, Platform, Alert, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import i18n from '../lib/i18n';
import { LANGUAGE_KEY, RTL_STATE_KEY } from '../lib/i18n';

/**
 * Restart the app properly for RTL changes
 * expo-updates reloadAsync() only reloads JS bundle, not native state
 * For RTL to truly apply, the native app must restart
 */
const restartApp = async (language: 'en' | 'ar') => {
  // Show user instructions since we can't programmatically do a full native restart
  Alert.alert(
    language === 'ar' ? 'أعد تشغيل التطبيق' : 'Restart Required',
    language === 'ar' 
      ? 'لتطبيق تغيير اتجاه النص، يرجى:\n\n1. أغلق التطبيق بالكامل (اسحب لأعلى من شريط المهام)\n2. أعد فتح التطبيق'
      : 'To apply the text direction change, please:\n\n1. Fully close the app (swipe up from the app switcher)\n2. Reopen the app',
    [
      { 
        text: 'OK',
        onPress: async () => {
          // Try expo-updates reload as a fallback
          // This reloads JS but may not fix RTL - user still needs full restart
          try {
            if (!__DEV__) {
              await Updates.reloadAsync();
            }
          } catch (e) {
            console.log('Reload not available');
          }
        }
      }
    ]
  );
};

/**
 * Change the app language and RTL layout
 * @param language - Language code ('en' or 'ar')
 * @param skipConfirmation - Skip the reload confirmation dialog
 */
export const changeLanguage = async (language: 'en' | 'ar', skipConfirmation = false) => {
  try {
    const currentLang = i18n.language;
    
    // If same language, no need to change
    if (currentLang === language) {
      return;
    }
    
    // Save language preference first
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
    
    // Update RTL layout setting
    const shouldBeRTL = language === 'ar';
    const needsRTLChange = I18nManager.isRTL !== shouldBeRTL;
    
    if (needsRTLChange) {
      // Allow RTL only for RTL languages
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      
      // Mark that we need to apply the RTL state change
      await AsyncStorage.setItem(RTL_STATE_KEY, 'pending_restart');
      
      // Change language in i18next (this updates text immediately)
      await i18n.changeLanguage(language);
      
      // Reload the app to apply RTL changes
      if (Platform.OS === 'web') {
        // For web, just reload the page
        window.location.reload();
      } else {
        // For native platforms, RTL changes require app restart
        if (skipConfirmation) {
          await restartApp(language);
        } else {
          // Show confirmation dialog
          Alert.alert(
            language === 'ar' ? 'تغيير اللغة' : 'Change Language',
            language === 'ar'
              ? 'سيتطلب هذا التغيير إعادة تشغيل التطبيق. هل تريد المتابعة؟'
              : 'This change requires an app restart. Do you want to continue?',
            [
              {
                text: language === 'ar' ? 'إلغاء' : 'Cancel',
                style: 'cancel',
                onPress: async () => {
                  // Revert changes
                  await AsyncStorage.setItem(LANGUAGE_KEY, currentLang);
                  await AsyncStorage.setItem(RTL_STATE_KEY, I18nManager.isRTL ? 'rtl' : 'ltr');
                  await i18n.changeLanguage(currentLang);
                  // Revert RTL settings
                  I18nManager.allowRTL(currentLang === 'ar');
                  I18nManager.forceRTL(currentLang === 'ar');
                }
              },
              {
                text: language === 'ar' ? 'متابعة' : 'Continue',
                onPress: () => restartApp(language)
              }
            ]
          );
        }
      }
    } else {
      // No RTL change needed, just update language
      await i18n.changeLanguage(language);
    }
  } catch (error) {
    console.error('Error changing language:', error);
    Alert.alert(
      'Error',
      'Failed to change language. Please try again.',
      [{ text: 'OK' }]
    );
  }
};

/**
 * Get current language
 */
export const getCurrentLanguage = (): 'en' | 'ar' => {
  return i18n.language as 'en' | 'ar';
};

/**
 * Check if current language is RTL
 */
export const isRTL = (): boolean => {
  return I18nManager.isRTL;
};

/**
 * Get the saved language from storage
 */
export const getSavedLanguage = async (): Promise<'en' | 'ar'> => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return (savedLang as 'en' | 'ar') || 'en';
  } catch (error) {
    console.error('Error getting saved language:', error);
    return 'en';
  }
};
