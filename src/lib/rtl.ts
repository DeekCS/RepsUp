/**
 * RTL/LTR Layout Direction Management
 * 
 * Uses a SINGLE restart when switching between RTL ↔ LTR.
 * This is the standard approach used by WhatsApp, Facebook, etc.
 * 
 * How it works:
 * 1. When user changes language that requires RTL change → ONE restart
 * 2. I18nManager.forceRTL() is applied before restart
 * 3. After restart, everything works correctly
 */

import { I18nManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================================
// CONSTANTS
// ============================================================================

export const LANGUAGE_STORAGE_KEY = 'app_language';
export const RTL_FIX_ATTEMPTED_KEY = 'rtl_fix_attempted';
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'] as const;
export type RTLLanguage = (typeof RTL_LANGUAGES)[number];
export type SupportedLanguage = 'en' | 'ar';

// ============================================================================
// RTL UTILITIES
// ============================================================================

/**
 * Check if a language code requires RTL layout
 */
export const isRTLLanguage = (languageCode: string): boolean => {
  return RTL_LANGUAGES.includes(languageCode as RTLLanguage);
};

/**
 * Get current RTL state from I18nManager
 */
export const getCurrentRTL = (): boolean => {
  return I18nManager.isRTL;
};

/**
 * Get layout direction string
 */
export const getLayoutDirection = (): 'rtl' | 'ltr' => {
  return I18nManager.isRTL ? 'rtl' : 'ltr';
};

// ============================================================================
// RESTART FUNCTION
// ============================================================================

/**
 * Restart the app - tries expo-updates first, falls back to RNRestart
 */
const restartApp = (): void => {
  if (Platform.OS === 'web') {
    window.location.reload();
    return;
  }

  // Use setTimeout to ensure I18nManager changes are persisted
  setTimeout(async () => {
    try {
      const Updates = require('expo-updates');
      await Updates.reloadAsync();
    } catch {
      try {
        const RNRestart = require('react-native-restart').default;
        RNRestart.restart();
      } catch (e) {
        console.error('[RTL] Could not restart:', e);
      }
    }
  }, 100);
};

// ============================================================================
// LANGUAGE CHANGE WITH RTL HANDLING
// ============================================================================

/**
 * Change language and restart if RTL direction changes
 * Returns true if restart will happen, false if no restart needed
 */
export const changeLanguageWithRTL = async (newLanguage: SupportedLanguage): Promise<boolean> => {
  const shouldBeRTL = isRTLLanguage(newLanguage);
  const currentRTL = I18nManager.isRTL;
  const needsRestart = shouldBeRTL !== currentRTL;

  // Save language preference
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);

  if (needsRestart && Platform.OS !== 'web') {
    console.log(`[RTL] Direction change: ${currentRTL ? 'RTL→LTR' : 'LTR→RTL'}, restarting...`);
    
    // Mark that we're about to fix RTL (prevents loop on next startup)
    await AsyncStorage.setItem(RTL_FIX_ATTEMPTED_KEY, 'true');
    
    // Apply RTL settings
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    
    // Restart app
    restartApp();
    return true;
  }

  // Web: just reload
  if (needsRestart && Platform.OS === 'web') {
    window.location.reload();
    return true;
  }

  return false;
};

// ============================================================================
// INITIALIZATION
// ============================================================================

let _initialized = false;

/**
 * Initialize RTL state based on saved language
 * Only restarts ONCE if RTL mismatch is detected (uses persistent flag to prevent loop)
 */
export const initializeRTL = async (): Promise<SupportedLanguage> => {
  if (_initialized) {
    const lang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (lang as SupportedLanguage) || 'en';
  }

  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null;
    const language = savedLanguage || 'en';
    const shouldBeRTL = isRTLLanguage(language);
    const currentRTL = I18nManager.isRTL;
    
    // Check if we already attempted to fix RTL (prevents infinite restart loop)
    const fixAttempted = await AsyncStorage.getItem(RTL_FIX_ATTEMPTED_KEY);
    
    console.log(`[RTL] Init - Language: ${language}, shouldBeRTL: ${shouldBeRTL}, I18nManager.isRTL: ${currentRTL}, fixAttempted: ${fixAttempted}`);
    
    // If RTL matches or we already tried to fix it, just continue
    if (shouldBeRTL === currentRTL || fixAttempted === 'true') {
      // Clear the fix attempted flag now that we're running normally
      if (fixAttempted === 'true') {
        await AsyncStorage.removeItem(RTL_FIX_ATTEMPTED_KEY);
        console.log(`[RTL] Cleared fix attempted flag`);
      }
      _initialized = true;
      return language;
    }
    
    // Mismatch detected and we haven't tried to fix it yet - fix and restart
    if (Platform.OS !== 'web') {
      console.log(`[RTL] Mismatch detected! Fixing RTL state and restarting...`);
      
      // Mark that we're attempting a fix (prevents loop)
      await AsyncStorage.setItem(RTL_FIX_ATTEMPTED_KEY, 'true');
      
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      
      // Restart to apply RTL changes
      setTimeout(() => {
        try {
          const Updates = require('expo-updates');
          Updates.reloadAsync();
        } catch {
          try {
            const RNRestart = require('react-native-restart').default;
            RNRestart.restart();
          } catch (e) {
            console.error('[RTL] Could not restart:', e);
          }
        }
      }, 100);
      
      _initialized = true;
      return language;
    }
    
    _initialized = true;
    return language;
  } catch (error) {
    console.error('[RTL] Init error:', error);
    _initialized = true;
    return 'en';
  }
};

/**
 * Check if RTL is initialized
 */
export const isRTLInitialized = (): boolean => _initialized;
