import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager, Platform, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import en from '../locales/en/translation.json';
import ar from '../locales/ar/translation.json';

const LANGUAGE_KEY = '@app_language';
const RTL_STATE_KEY = '@rtl_state_applied';

/**
 * Flag to track if RTL change is pending (needs restart)
 */
let rtlChangePending = false;

/**
 * Check if RTL change is pending
 */
export const isRTLChangePending = (): boolean => rtlChangePending;

/**
 * Initialize the RTL state
 * Uses I18nManager to dynamically set RTL according to Expo docs
 * IMPORTANT: RTL changes require a FULL app restart (not just reload)
 * 
 * @returns Object with language and whether reload is needed
 */
export const initializeRTL = async (): Promise<{ lang: 'en' | 'ar'; needsReload: boolean }> => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    const pendingState = await AsyncStorage.getItem(RTL_STATE_KEY);
    const lang = (savedLang as 'en' | 'ar') || 'en';
    
    // Determine if RTL should be enabled
    const shouldBeRTL = lang === 'ar';
    
    console.log(`[RTL Init] Current language: ${lang}, Should be RTL: ${shouldBeRTL}, Is RTL: ${I18nManager.isRTL}, Pending: ${pendingState}`);
    
    // IMPORTANT: Check if there's a mismatch that needs fixing
    if (I18nManager.isRTL !== shouldBeRTL) {
      console.log(`[RTL Init] RTL MISMATCH DETECTED! Current: ${I18nManager.isRTL}, Need: ${shouldBeRTL}`);
      
      // Set the flag
      rtlChangePending = true;
      
      // Allow RTL first (required before forceRTL)
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      
      await AsyncStorage.setItem(RTL_STATE_KEY, 'pending_restart');
      
      console.log(`[RTL Init] RTL state set to ${shouldBeRTL}. ${__DEV__ ? 'Manual restart required in dev mode.' : 'Triggering OTA reload...'}`);

      if (__DEV__) {
        // In development the JS reload does NOT rebuild the native tree, so forceRTL never applies
        // Instead we log and let the UI prompt for a full reload/killing the app
        return { lang, needsReload: false };
      }

      // Production builds can safely trigger an OTA reload to apply RTL changes automatically
      setTimeout(async () => {
        try {
          console.log('[RTL Init] Production mode - using Updates.reloadAsync()');
          await Updates.reloadAsync();
        } catch (reloadError) {
          console.log('[RTL Init] Updates.reloadAsync() failed:', reloadError);
        }
      }, 200);
      
      return { lang, needsReload: true };
    } else {
      console.log(`[RTL Init] RTL state is correct (${I18nManager.isRTL})`);
      rtlChangePending = false;
      await AsyncStorage.setItem(RTL_STATE_KEY, shouldBeRTL ? 'rtl' : 'ltr');
      return { lang, needsReload: false };
    }
  } catch (error) {
    console.error('Error initializing RTL:', error);
    // Default to English with LTR
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    return { lang: 'en', needsReload: false };
  }
};

/**
 * Force reset to LTR (English) - useful for debugging
 * Call this and then FULLY RESTART the app
 */
export const forceResetToLTR = async () => {
  await AsyncStorage.setItem(LANGUAGE_KEY, 'en');
  await AsyncStorage.setItem(RTL_STATE_KEY, 'ltr');
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  console.log('[RTL] Reset to LTR. FULLY RESTART THE APP NOW!');
};

/**
 * Switch language with proper RTL handling
 * This function handles the full language switch flow:
 * 1. Save language preference
 * 2. Update i18next
 * 3. Update RTL state if needed
 * 4. Reload app if RTL state changed
 * 
 * @param lang - The language to switch to ('en' or 'ar')
 * @param forceReload - Force app reload even if RTL state matches (default: false)
 * @returns Promise<boolean> - Returns true if reload was triggered
 */
export const switchLanguage = async (lang: 'en' | 'ar', forceReload = false): Promise<boolean> => {
  try {
    console.log(`[RTL] Switching language to: ${lang}`);
    
    // Step 1: Save language preference
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    
    // Step 2: Update i18next
    await i18next.changeLanguage(lang);
    
    // Step 3: Determine if RTL change is needed
    const shouldBeRTL = lang === 'ar';
    const currentRTL = I18nManager.isRTL;
    const needsRTLChange = currentRTL !== shouldBeRTL;
    
    console.log(`[RTL] Current RTL: ${currentRTL}, Should be: ${shouldBeRTL}, Needs change: ${needsRTLChange}`);
    
    if (needsRTLChange || forceReload) {
      // Step 4: Update RTL state
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      
      // Mark as pending restart
      await AsyncStorage.setItem(RTL_STATE_KEY, 'pending_restart');
      
      console.log(`[RTL] RTL state updated to ${shouldBeRTL}. ${__DEV__ ? 'Manual restart required in dev mode.' : 'Triggering OTA reload...'}`);
      
      if (__DEV__) {
        // In dev we cannot rely on JS reloads applying the native tree changes, so rely on manual restart
        rtlChangePending = true;
        return false;
      }

      // Step 5: Reload app (production)
      setTimeout(async () => {
        try {
          console.log('[RTL] Production mode - using Updates.reloadAsync()');
          await Updates.reloadAsync();
        } catch (reloadError) {
          console.log('[RTL] Reload failed:', reloadError);
          rtlChangePending = true;
        }
      }, 200);
      
      return true;
    }
    
    // No RTL change needed, just language updated
    await AsyncStorage.setItem(RTL_STATE_KEY, shouldBeRTL ? 'rtl' : 'ltr');
    console.log(`[RTL] Language switched to ${lang}, no RTL change needed`);
    return false;
    
  } catch (error) {
    console.error('[RTL] Language switch failed:', error);
    throw error;
  }
};

/**
 * Get the current saved language preference
 */
export const getSavedLanguage = async (): Promise<'en' | 'ar'> => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return (savedLang as 'en' | 'ar') || 'en';
  } catch {
    return 'en';
  }
};

/**
 * Debug function to check current RTL state
 * Useful for troubleshooting RTL issues
 */
export const debugRTLState = async () => {
  const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  const rtlState = await AsyncStorage.getItem(RTL_STATE_KEY);
  
  const debugInfo = {
    savedLanguage: savedLang || 'not set (defaulting to en)',
    savedRTLState: rtlState || 'not set',
    i18nManagerIsRTL: I18nManager.isRTL,
    shouldBeRTL: savedLang === 'ar',
    mismatch: I18nManager.isRTL !== (savedLang === 'ar'),
    platform: Platform.OS,
  };
  
  console.log('[RTL Debug]', JSON.stringify(debugInfo, null, 2));
  return debugInfo;
};

// Initialize i18next with default values
// The actual language will be set after initializeRTL() completes
i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    lng: 'en', // Initial language, will be updated by initializeRTL
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Important for React Native
    },
  });

export { LANGUAGE_KEY, RTL_STATE_KEY };
export default i18next;
