/**
 * i18n Configuration for - RepsUp
 * 
 * This module initializes i18next for internationalization.
 * RTL direction changes trigger a single app restart (via rtl.ts).
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

import translationAr from '../locales/ar/translation.json';
import translationEn from '../locales/en/translation.json';

import {
  LANGUAGE_STORAGE_KEY,
  type SupportedLanguage,
} from './rtl';

// ============================================================================
// CONSTANTS & RESOURCES
// ============================================================================

const resources: Record<SupportedLanguage, { translation: typeof translationEn }> = {
  ar: { translation: translationAr },
  en: { translation: translationEn },
};

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'ar'];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validate and normalize language code
 */
const normalizeLanguage = (lang: string | null | undefined): SupportedLanguage => {
  if (!lang) return 'en';
  const normalized = lang.toLowerCase().split('-')[0] as SupportedLanguage;
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : 'en';
};

/**
 * Get the initial language synchronously based on I18nManager state
 * This ensures our i18n language matches the RTL state on startup
 * 
 * IMPORTANT: This is called during i18n initialization, before async storage is read
 */
const getInitialLanguage = (): SupportedLanguage => {
  // If I18nManager is RTL, we should default to Arabic
  // This prevents mismatch between layout and language on first render
  if (I18nManager.isRTL) {
    return 'ar';
  }
  return 'en';
};

// ============================================================================
// i18n INITIALIZATION
// ============================================================================

// Initialize i18n synchronously with a language that matches RTL state
i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  // Disable automatic language detection - we handle it ourselves
  detection: undefined,
});

// ============================================================================
// ASYNC LANGUAGE LOADING
// ============================================================================

let _isLanguageLoaded = false;
let _languageLoadPromise: Promise<SupportedLanguage> | null = null;

/**
 * Load saved language from AsyncStorage and update i18n
 * This is called after the initial render to sync with persisted preference
 */
export const loadSavedLanguage = async (): Promise<SupportedLanguage> => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    
    if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang as SupportedLanguage)) {
      const language = savedLang as SupportedLanguage;
      
      // Only change if different from current
      if (i18n.language !== language) {
        await i18n.changeLanguage(language);
      }
      
      _isLanguageLoaded = true;
      return language;
    }
    
    // No saved language - try device locale
    const deviceLocale = Localization.getLocales()[0]?.languageCode;
    const language = normalizeLanguage(deviceLocale);
    
    // Save this as the user's preference
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    
    if (i18n.language !== language) {
      await i18n.changeLanguage(language);
    }
    
    _isLanguageLoaded = true;
    return language;
  } catch (error) {
    console.warn('[i18n] Error loading saved language:', error);
    _isLanguageLoaded = true;
    return 'en';
  }
};

/**
 * Initialize language loading - returns a promise that resolves when complete
 */
export const initializeLanguage = (): Promise<SupportedLanguage> => {
  if (_languageLoadPromise) {
    return _languageLoadPromise;
  }
  
  _languageLoadPromise = loadSavedLanguage();
  return _languageLoadPromise;
};

/**
 * Check if language has been loaded from storage
 */
export const isLanguageLoaded = (): boolean => _isLanguageLoaded;

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Change the app language (basic i18n only)
 * Note: For language changes that require RTL/LTR switch, use changeLanguageWithRTL from rtl.ts
 */
export const changeLanguage = async (languageCode: SupportedLanguage): Promise<void> => {
  if (!SUPPORTED_LANGUAGES.includes(languageCode)) {
    console.error(`[i18n] Invalid language: ${languageCode}`);
    return;
  }

  const currentLanguage = i18n.language as SupportedLanguage;
  
  if (currentLanguage === languageCode) {
    return;
  }

  // Update i18n language
  await i18n.changeLanguage(languageCode);
};

/**
 * Toggle between English and Arabic
 */
export const toggleLanguage = async (): Promise<void> => {
  const currentLang = i18n.language as SupportedLanguage;
  const newLang: SupportedLanguage = currentLang === 'ar' ? 'en' : 'ar';
  await changeLanguage(newLang);
};

/**
 * Get current language code
 */
export const getCurrentLanguage = (): SupportedLanguage => {
  return (i18n.language || 'en') as SupportedLanguage;
};

/**
 * Check if current layout is RTL
 */
export const isRTL = (): boolean => I18nManager.isRTL;

/**
 * Get text for language toggle button
 */
export const getLanguageToggleText = (): string => {
  return i18n.language === 'ar' ? 'English' : 'العربية';
};

/**
 * Get list of available languages
 */
export const getAvailableLanguages = (): SupportedLanguage[] => {
  return [...SUPPORTED_LANGUAGES];
};

/**
 * Get language display name
 */
export const getLanguageDisplayName = (code: SupportedLanguage): string => {
  const names: Record<SupportedLanguage, string> = {
    en: 'English',
    ar: 'العربية',
  };
  return names[code] || code;
};

export default i18n;
