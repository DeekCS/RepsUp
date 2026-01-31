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
  // RTL styling utilities
  textAlign,
  flexDirection,
  alignItems,
  justifyContent,
  padding,
  margin,
  position,
  borderRadius,
  transform,
  type RTLLanguage,
} from './rtl';

// I18n Provider
export {
  I18nProvider,
  useI18n,
  type SupportedLanguage,
} from './I18nProvider';
