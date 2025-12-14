/**
 * Centralized I18n Provider
 * 
 * Production-grade localization with:
 * - Global RTL/LTR direction management
 * - Single source of truth for language state
 * - Clean app reload handling when direction changes
 * - No per-component isRTL conditionals needed
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { I18nManager, Platform } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from './i18n';

// ============================================================================
// CONSTANTS
// ============================================================================

export const LANGUAGE_STORAGE_KEY = 'app_language';
const RTL_RESTART_GUARD_KEY = 'rtl_restart_guard';
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'] as const;
export type SupportedLanguage = 'en' | 'ar';

// ============================================================================
// UTILITIES
// ============================================================================

export const isRTLLanguage = (lang: string): boolean => {
  return RTL_LANGUAGES.some(rtlLang => lang.startsWith(rtlLang));
};

// ============================================================================
// CONTEXT TYPES
// ============================================================================

interface I18nContextValue {
  /** Whether the provider is fully initialized */
  isReady: boolean;
  /** Current language code */
  language: SupportedLanguage;
  /** Whether layout is RTL (from I18nManager) */
  isRTL: boolean;
  /** Change language - will reload app if direction changes */
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
  /** Toggle between English and Arabic */
  toggleLanguage: () => Promise<void>;
  /** Get the opposite language label for toggle button */
  getToggleLabel: () => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface I18nProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function I18nProvider({ children, fallback }: I18nProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  // RTL state: on web use language, on native use I18nManager
  const isRTL = Platform.OS === 'web' ? isRTLLanguage(language) : (I18nManager.isRTL ?? false);

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        // Get saved language preference
        const savedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        const lang = (savedLang as SupportedLanguage) || 'en';
        
        const shouldBeRTL = isRTLLanguage(lang);
        const currentRTL = I18nManager.isRTL ?? false;

        console.log(`[I18n] Init: lang=${lang}, shouldBeRTL=${shouldBeRTL}, currentRTL=${currentRTL}`);

        // Set HTML dir attribute for web
        if (Platform.OS === 'web' && typeof document !== 'undefined') {
          document.documentElement.dir = shouldBeRTL ? 'rtl' : 'ltr';
          document.documentElement.lang = lang;
        }

        // Check for RTL mismatch on native platforms
        if (Platform.OS !== 'web' && shouldBeRTL !== currentRTL) {
          // Prevent infinite restart loop with a guard
          const restartGuard = await AsyncStorage.getItem(RTL_RESTART_GUARD_KEY);
          const guardTimestamp = restartGuard ? parseInt(restartGuard, 10) : 0;
          const now = Date.now();
          
          // If we've tried to restart in the last 5 seconds, skip to prevent loop
          if (now - guardTimestamp < 5000) {
            console.log('[I18n] Skipping RTL restart (guard active), continuing with mismatch');
          } else {
            console.log('[I18n] RTL mismatch detected, fixing...');
            I18nManager.allowRTL(shouldBeRTL);
            I18nManager.forceRTL(shouldBeRTL);
            
            // Set restart guard
            await AsyncStorage.setItem(RTL_RESTART_GUARD_KEY, now.toString());
            
            // Trigger app reload
            setTimeout(async () => {
              try {
                const Updates = require('expo-updates');
                await Updates.reloadAsync();
              } catch {
                try {
                  const RNRestart = require('react-native-restart').default;
                  RNRestart.restart();
                } catch (e) {
                  console.error('[I18n] Could not restart:', e);
                }
              }
            }, 100);
            return;
          }
        }

        // Initialize i18next with saved language
        if (!i18n.isInitialized) {
          await i18n.init();
        }
        await i18n.changeLanguage(lang);

        if (mounted) {
          setLanguageState(lang);
          setIsReady(true);
        }
      } catch (error) {
        console.error('[I18n] Init error:', error);
        if (mounted) {
          setIsReady(true);
        }
      }
    };

    initialize();
    return () => { mounted = false; };
  }, []);

  // ============================================================================
  // LANGUAGE CHANGE HANDLER
  // ============================================================================

  const setLanguage = useCallback(async (newLang: SupportedLanguage) => {
    if (newLang === language) return;

    const shouldBeRTL = isRTLLanguage(newLang);
    const currentLangIsRTL = isRTLLanguage(language);
    const needsReload = shouldBeRTL !== currentLangIsRTL;

    // Save preference first
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);

    if (needsReload) {
      console.log(`[I18n] Direction change: ${currentLangIsRTL ? 'RTL→LTR' : 'LTR→RTL'}`);

      if (Platform.OS === 'web') {
        // Web: set dir attribute and reload
        if (typeof document !== 'undefined') {
          document.documentElement.dir = shouldBeRTL ? 'rtl' : 'ltr';
          document.documentElement.lang = newLang;
        }
        window.location.reload();
        return;
      }

      // Native: apply RTL settings and restart
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);

      setTimeout(async () => {
        try {
          const Updates = require('expo-updates');
          await Updates.reloadAsync();
        } catch {
          try {
            const RNRestart = require('react-native-restart').default;
            RNRestart.restart();
          } catch (e) {
            console.error('[I18n] Could not restart:', e);
          }
        }
      }, 100);
      return;
    }

    // No direction change - just update i18n
    await i18n.changeLanguage(newLang);
    setLanguageState(newLang);
  }, [language]);

  // ============================================================================
  // CONVENIENCE METHODS
  // ============================================================================

  const toggleLanguage = useCallback(async () => {
    await setLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, setLanguage]);

  const getToggleLabel = useCallback(() => {
    return language === 'ar' ? 'English' : 'العربية';
  }, [language]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const value = useMemo<I18nContextValue>(() => ({
    isReady,
    language,
    isRTL,
    setLanguage,
    toggleLanguage,
    getToggleLabel,
  }), [isReady, language, isRTL, setLanguage, toggleLanguage, getToggleLabel]);

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!isReady) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <I18nContext.Provider value={value}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </I18nContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export default I18nProvider;
