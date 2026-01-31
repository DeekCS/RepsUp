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
// RTL-AWARE STYLING UTILITIES
// ============================================================================

type FlexAlignment = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'auto';

/**
 * Get RTL-aware text alignment
 * @param align - 'left' or 'right' (will flip in RTL), or 'center'/'justify' (stays same)
 */
export const textAlign = (align: 'left' | 'right' | 'center' | 'justify'): TextAlign => {
  if (align === 'center' || align === 'justify') return align;
  if (!I18nManager.isRTL) return align;
  return align === 'left' ? 'right' : 'left';
};

/**
 * Get RTL-aware flex direction
 * Automatically flips 'row' to 'row-reverse' in RTL
 */
export const flexDirection = (direction: 'row' | 'column' = 'row'): FlexDirection => {
  if (direction === 'column') return 'column';
  return I18nManager.isRTL ? 'row-reverse' : 'row';
};

/**
 * Get RTL-aware alignment
 * Flips flex-start/flex-end in RTL
 */
export const alignItems = (alignment: FlexAlignment): FlexAlignment => {
  if (!I18nManager.isRTL || alignment === 'center' || alignment === 'stretch' || alignment === 'baseline') {
    return alignment;
  }
  return alignment === 'flex-start' ? 'flex-end' : 'flex-start';
};

/**
 * Get RTL-aware justify content
 * Flips flex-start/flex-end in RTL
 */
export const justifyContent = (alignment: FlexAlignment | 'space-between' | 'space-around' | 'space-evenly'): string => {
  if (!I18nManager.isRTL || 
      alignment === 'center' || 
      alignment === 'stretch' || 
      alignment === 'baseline' ||
      alignment === 'space-between' ||
      alignment === 'space-around' ||
      alignment === 'space-evenly') {
    return alignment;
  }
  return alignment === 'flex-start' ? 'flex-end' : 'flex-start';
};

/**
 * RTL-aware padding (left/right)
 * Use paddingStart/paddingEnd instead of paddingLeft/paddingRight
 */
export const padding = {
  start: (value: number) => (I18nManager.isRTL ? { paddingRight: value } : { paddingLeft: value }),
  end: (value: number) => (I18nManager.isRTL ? { paddingLeft: value } : { paddingRight: value }),
};

/**
 * RTL-aware margin (left/right)
 * Use marginStart/marginEnd instead of marginLeft/marginRight
 */
export const margin = {
  start: (value: number) => (I18nManager.isRTL ? { marginRight: value } : { marginLeft: value }),
  end: (value: number) => (I18nManager.isRTL ? { marginLeft: value } : { marginRight: value }),
};

/**
 * RTL-aware positioning (left/right)
 */
export const position = {
  start: (value: number) => (I18nManager.isRTL ? { right: value } : { left: value }),
  end: (value: number) => (I18nManager.isRTL ? { left: value } : { right: value }),
};

/**
 * RTL-aware border radius
 * Flips corner positions for RTL
 */
export const borderRadius = {
  topStart: (value: number) => (I18nManager.isRTL ? { borderTopRightRadius: value } : { borderTopLeftRadius: value }),
  topEnd: (value: number) => (I18nManager.isRTL ? { borderTopLeftRadius: value } : { borderTopRightRadius: value }),
  bottomStart: (value: number) => (I18nManager.isRTL ? { borderBottomRightRadius: value } : { borderBottomLeftRadius: value }),
  bottomEnd: (value: number) => (I18nManager.isRTL ? { borderBottomLeftRadius: value } : { borderBottomRightRadius: value }),
};

/**
 * Transform value for RTL (flips horizontal transforms)
 */
export const transform = {
  scaleX: (value: number) => (I18nManager.isRTL ? -value : value),
  translateX: (value: number) => (I18nManager.isRTL ? -value : value),
  rotate: (degrees: string) => {
    if (!I18nManager.isRTL) return degrees;
    const match = degrees.match(/(-?\d+(?:\.\d+)?)deg/);
    if (match) {
      const angle = parseFloat(match[1]);
      return `${-angle}deg`;
    }
    return degrees;
  },
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
    
    if (Platform.OS === 'ios') {
      console.warn(
        '[RTL] iOS requires app rebuild for RTL changes.\n' +
        'Please:\n' +
        '1. Close this app completely\n' +
        '2. Run: npx expo run:ios\n' +
        'Or for testing only, the app will attempt restart but may need manual rebuild.'
      );
    }
    
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
    
    // If RTL matches, we're good
    if (shouldBeRTL === currentRTL) {
      // Clear any fix attempted flag
      if (fixAttempted === 'true') {
        await AsyncStorage.removeItem(RTL_FIX_ATTEMPTED_KEY);
      }
      _initialized = true;
      return language;
    }
    
    // RTL mismatch detected
    if (Platform.OS !== 'web') {
      // On iOS, RTL requires a native rebuild - don't attempt restarts
      if (Platform.OS === 'ios') {
        console.warn(
          `[RTL] RTL mismatch on iOS detected.\n` +
          `Expected RTL: ${shouldBeRTL}, Actual: ${currentRTL}\n` +
          `iOS requires native rebuild. Close the app and run: npx expo run:ios`
        );
        _initialized = true;
        return language;
      }
      
      // Android: If we already tried to fix it once, don't restart again
      if (fixAttempted === 'true') {
        console.warn(
          `[RTL] RTL mismatch persists after restart attempt.\n` +
          `Expected RTL: ${shouldBeRTL}, Actual: ${currentRTL}\n` +
          `Close app completely and rebuild with: npx expo run:android`
        );
        await AsyncStorage.removeItem(RTL_FIX_ATTEMPTED_KEY);
        _initialized = true;
        return language;
      }
      
      // Android: First mismatch - try to fix it
      console.log(`[RTL] Mismatch detected! Setting RTL and restarting...`);
      
      await AsyncStorage.setItem(RTL_FIX_ATTEMPTED_KEY, 'true');
      
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      
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
