/**
 * Localization Provider
 * 
 * Handles i18n and RTL with a SINGLE restart when direction changes.
 * This is the standard production approach (WhatsApp, Facebook, etc.)
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { I18nManager, View, ActivityIndicator, StyleSheet } from 'react-native';
import { I18nextProvider } from 'react-i18next';

import i18n, { initializeLanguage } from './i18n';
import { 
  initializeRTL, 
  changeLanguageWithRTL,
  type SupportedLanguage 
} from './rtl';

// ============================================================================
// CONTEXT
// ============================================================================

interface LocalizationContextValue {
  isReady: boolean;
  language: SupportedLanguage;
  isRTL: boolean;
  changeLanguage: (language: SupportedLanguage) => Promise<void>;
  toggleLanguage: () => Promise<void>;
}

const LocalizationContext = createContext<LocalizationContextValue | null>(null);

// ============================================================================
// PROVIDER
// ============================================================================

interface LocalizationProviderProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export function LocalizationProvider({ children, loadingComponent }: LocalizationProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  
  // RTL comes from I18nManager - it's the source of truth after restart
  const isRTL = I18nManager.isRTL;

  // Initialize
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        // Get saved language
        const savedLang = await initializeRTL();
        
        // Load i18n
        await initializeLanguage();
        
        if (mounted) {
          setLanguage(savedLang);
          setIsReady(true);
        }
      } catch (error) {
        console.error('[Localization] Init error:', error);
        if (mounted) setIsReady(true);
      }
    };

    init();
    return () => { mounted = false; };
  }, []);

  // Sync language state with i18n changes
  useEffect(() => {
    const handleChange = (lng: string) => setLanguage(lng as SupportedLanguage);
    i18n.on('languageChanged', handleChange);
    return () => { i18n.off('languageChanged', handleChange); };
  }, []);

  // Change language - will restart if RTL direction changes
  const changeLanguage = useCallback(async (newLang: SupportedLanguage) => {
    if (newLang === language) return;

    // This will restart the app if RTL direction changes
    const willRestart = await changeLanguageWithRTL(newLang);
    
    // If not restarting, update i18n and state
    if (!willRestart) {
      await i18n.changeLanguage(newLang);
      setLanguage(newLang);
    }
    // If restarting, app will reload and reinitialize with new language
  }, [language]);

  // Toggle language
  const toggleLanguage = useCallback(async () => {
    await changeLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, changeLanguage]);

  const value = useMemo(() => ({
    isReady,
    language,
    isRTL,
    changeLanguage,
    toggleLanguage,
  }), [isReady, language, isRTL, changeLanguage, toggleLanguage]);

  if (!isReady) {
    return loadingComponent ? <>{loadingComponent}</> : (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#5B5FEF" />
      </View>
    );
  }

  return (
    <LocalizationContext.Provider value={value}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </LocalizationContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useLocalization(): LocalizationContextValue {
  const context = useContext(LocalizationContext);
  if (!context) throw new Error('useLocalization must be used within LocalizationProvider');
  return context;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default LocalizationProvider;
