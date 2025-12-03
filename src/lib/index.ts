/**
 * Library exports barrel file
 */

// i18n and localization
export { default as i18n } from './i18n';
export {
  changeLanguage,
  toggleLanguage,
  getCurrentLanguage,
  isRTL,
  getLanguageToggleText,
  getAvailableLanguages,
  getLanguageDisplayName,
  initializeLanguage,
  isLanguageLoaded,
} from './i18n';

// RTL utilities
export {
  LANGUAGE_STORAGE_KEY,
  RTL_LANGUAGES,
  isRTLLanguage,
  getLayoutDirection,
  getCurrentRTL,
  initializeRTL,
  isRTLInitialized,
  changeLanguageWithRTL,
  type SupportedLanguage,
  type RTLLanguage,
} from './rtl';

// Localization Provider
export {
  LocalizationProvider,
  useLocalization,
} from './LocalizationProvider';
