/**
 * RTL Best Practices for Expo/React Native Apps
 * ==============================================
 * 
 * This file documents the best practices for RTL support based on extensive research
 * from Expo docs, React Navigation docs, and community best practices.
 * 
 * KEY CONCEPTS:
 * 
 * 1. I18nManager.isRTL - Read-only value that reflects current RTL state
 *    - Set at app launch based on device language or forceRTL
 *    - CANNOT be changed during runtime without app restart
 * 
 * 2. I18nManager.forceRTL(boolean) - Force RTL layout
 *    - Requires app restart to take effect
 *    - Should be called early in app initialization
 * 
 * 3. I18nManager.allowRTL(boolean) - Allow/disallow RTL
 *    - Should be set before forceRTL
 * 
 * RTL FLOW FOR LANGUAGE SWITCHING:
 * ================================
 * 
 * 1. User selects new language
 * 2. Save language preference to AsyncStorage
 * 3. Call I18nManager.allowRTL(isRTLLanguage)
 * 4. Call I18nManager.forceRTL(isRTLLanguage)
 * 5. Restart app using expo-updates reloadAsync()
 * 6. On next launch, initializeRTL() reads saved language and applies RTL state
 * 
 * REACT NAVIGATION RTL SUPPORT:
 * ============================
 * 
 * React Navigation (v7+) automatically detects I18nManager.isRTL and:
 * - Flips tab bar item order
 * - Flips stack navigator gesture direction
 * - Flips drawer position
 * - Adjusts header button positions
 * 
 * However, you can also explicitly set the direction via ThemeProvider:
 * 
 * ```tsx
 * <ThemeProvider value={theme}>
 *   <NavigationContainer>
 *     ...
 *   </NavigationContainer>
 * </ThemeProvider>
 * ```
 * 
 * EXPO ROUTER:
 * ===========
 * 
 * Expo Router is built on React Navigation, so the same RTL support applies.
 * The key is to ensure I18nManager.isRTL is set correctly BEFORE the app renders.
 * 
 * STYLING BEST PRACTICES:
 * ======================
 * 
 * ✅ DO use logical properties:
 * - marginStart / marginEnd instead of marginLeft / marginRight
 * - paddingStart / paddingEnd instead of paddingLeft / paddingRight
 * - These automatically flip in RTL mode
 * 
 * ✅ DO use flexbox start/end alignment:
 * - alignItems: 'flex-start' / 'flex-end'
 * - justifyContent: 'flex-start' / 'flex-end'
 * - These work correctly in both LTR and RTL
 * 
 * ✅ DO set writingDirection for Text:
 * - writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
 * 
 * ✅ DO set textAlign appropriately:
 * - textAlign: 'left' behaves like 'start' in React Native (auto-flips)
 * - For true left alignment, use absolute positioning
 * 
 * ❌ DON'T use left/right for positioning when you mean start/end:
 * - left/right are absolute and don't flip
 * - Use marginStart/marginEnd or start/end properties
 * 
 * ❌ DON'T forget to flip directional icons:
 * - Arrows, chevrons, etc. should be flipped
 * - Use transform: [{ scaleX: isRTL ? -1 : 1 }]
 * 
 * EXPO CONFIG (app.json):
 * ======================
 * 
 * Required configuration for RTL support:
 * 
 * ```json
 * {
 *   "expo": {
 *     "extra": {
 *       "supportsRTL": true
 *     },
 *     "plugins": [
 *       [
 *         "expo-localization",
 *         {
 *           "supportedLocales": ["en", "ar"]
 *         }
 *       ]
 *     ],
 *     "ios": {
 *       "infoPlist": {
 *         "ExpoLocalization_supportsRTL": true,
 *         "CFBundleAllowMixedLocalizations": true,
 *         "CFBundleLocalizations": ["en", "ar"]
 *       }
 *     },
 *     "android": {
 *       "supportsRTL": true
 *     }
 *   }
 * }
 * ```
 * 
 * DEVELOPMENT BUILD REQUIREMENT:
 * =============================
 * 
 * For full RTL support, you need a development build (not Expo Go):
 * 
 * npx expo run:ios
 * npx expo run:android
 * 
 * Expo Go has limitations with I18nManager as it resets RTL preferences.
 * 
 * DEBUGGING RTL:
 * =============
 * 
 * 1. Check I18nManager.isRTL value:
 *    console.log('Is RTL:', I18nManager.isRTL);
 * 
 * 2. Force RTL for testing (in app.json):
 *    "extra": { "supportsRTL": true, "forcesRTL": true }
 * 
 * 3. Check if AsyncStorage has saved language:
 *    const lang = await AsyncStorage.getItem('@app_language');
 * 
 * COMMON ISSUES:
 * =============
 * 
 * Issue: Tabs not flipping in RTL
 * Solution: Ensure I18nManager.isRTL is true before navigation mounts
 * 
 * Issue: Text aligned wrong after language switch
 * Solution: App needs full restart, not just reload
 * 
 * Issue: Stack animations going wrong direction
 * Solution: React Navigation reads I18nManager.isRTL on mount - ensure it's set
 * 
 * Issue: RTL works in dev but not in production
 * Solution: Check that supportsRTL is in app.json under "extra"
 */

import { I18nManager, Platform } from 'react-native';

// Type definitions
export type Direction = 'ltr' | 'rtl';
export type Language = 'en' | 'ar';

// RTL language codes
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'] as const;

/**
 * Check if a language code is RTL
 */
export const isRTLLanguage = (langCode: string): boolean => {
  return RTL_LANGUAGES.some(rtl => langCode.startsWith(rtl));
};

/**
 * Get current direction
 */
export const getDirection = (): Direction => {
  return I18nManager.isRTL ? 'rtl' : 'ltr';
};

/**
 * Check if current layout is RTL
 */
export const isRTL = (): boolean => {
  return I18nManager.isRTL;
};

/**
 * Get appropriate icon name for directional icons
 * @param ltrIcon Icon name for LTR
 * @param rtlIcon Icon name for RTL (optional, uses flipped ltrIcon if not provided)
 */
export const getDirectionalIcon = (ltrIcon: string, rtlIcon?: string): string => {
  if (I18nManager.isRTL && rtlIcon) {
    return rtlIcon;
  }
  return ltrIcon;
};

/**
 * Console log RTL debug info
 */
export const debugRTL = () => {
  console.log('[RTL Debug]', {
    isRTL: I18nManager.isRTL,
    platform: Platform.OS,
    // @ts-ignore - doLeftAndRightSwapInRTL exists but not in types
    doLeftAndRightSwapInRTL: I18nManager.doLeftAndRightSwapInRTL,
  });
};
