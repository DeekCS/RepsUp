import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState, useCallback } from 'react';
import { I18nManager, View, Platform, Alert } from 'react-native';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@react-navigation/native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { getLocales } from 'expo-localization';
import i18n, { initializeRTL, isRTLChangePending } from '../src/lib/i18n';
import { DirectionProvider } from '../src/contexts/DirectionContext';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [layoutKey, setLayoutKey] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [rtlMismatch, setRtlMismatch] = useState(false);
  const [fontsLoaded] = useFonts({
    'DMSans-Regular': DMSans_400Regular,
    'DMSans-Medium': DMSans_500Medium,
    'DMSans-Bold': DMSans_700Bold,
  });

  // Initialize RTL and i18n on mount
  useEffect(() => {
    const init = async () => {
      try {
        // Initialize RTL state and get saved language
        const { lang: savedLang, needsReload } = await initializeRTL();
        
        // If reload was triggered, don't continue - app will restart
        if (needsReload) {
          console.log('[Layout] RTL reload triggered, waiting for restart...');
          return;
        }
        
        // Check if there's a mismatch that needs restart
        const hasMismatch = isRTLChangePending();
        setRtlMismatch(hasMismatch);
        
        // Update i18n to use saved language
        if (i18n.language !== savedLang) {
          await i18n.changeLanguage(savedLang);
        }
        
        // Mark as ready
        setIsReady(true);
        
        // If there's a mismatch, show alert after render
        if (hasMismatch) {
          setTimeout(() => {
            Alert.alert(
              savedLang === 'ar' ? 'أعد تشغيل التطبيق' : 'Restart Required',
              savedLang === 'ar' 
                ? 'تم تغيير اللغة. لتطبيق اتجاه النص الجديد، يرجى إغلاق التطبيق بالكامل وإعادة فتحه.'
                : 'Language has been changed. To apply the new text direction, please fully close and reopen the app.',
              [{ text: 'OK' }]
            );
          }, 500);
        }
      } catch (error) {
        console.error('Error during initialization:', error);
        setIsReady(true); // Continue anyway
      }
    };
    
    init();
  }, []);

  // Listen for language changes and force remount
  useEffect(() => {
    const handleLanguageChange = (lang: string) => {
      console.log('Language changed to:', lang);
      // Force complete remount by changing key
      setLayoutKey(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Hide splash screen when ready
  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded && isReady) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded, isReady]);

  // Don't render until everything is ready
  if (!fontsLoaded || !isReady) {
    return null;
  }

  // Create theme with RTL direction for React Navigation
  const isRTL = I18nManager.isRTL;
  
  // Debug log - remove in production
  console.log('[Layout] Rendering with isRTL:', isRTL);
  
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#5B5FEF',
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#1F2937',
      border: '#E5E7EB',
      notification: '#EF4444',
    },
  };

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider value={navigationTheme}>
        <DirectionProvider>
          <View 
            key={`layout-${layoutKey}-${isRTL ? 'rtl' : 'ltr'}`}
            // @ts-ignore - dir prop is for web support
            dir={Platform.OS === 'web' ? (isRTL ? 'rtl' : 'ltr') : undefined}
            style={{ flex: 1 }}
          >
            <SafeAreaProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: '#f5f5f5',
                  },
                  headerTintColor: '#000',
                  headerTitleStyle: {
                    fontWeight: '600',
                  },
                  animation: 'default',
                  // RTL-aware animation direction
                  animationTypeForReplace: 'push',
                }}
              >
                <Stack.Screen 
                  name="index" 
                  options={{ 
                    headerShown: false,
                  }} 
                />
                <Stack.Screen 
                  name="auth/login" 
                  options={{ 
                    headerShown: false,
                  }} 
                />
                <Stack.Screen 
                  name="auth/verify-otp" 
                  options={{ 
                    headerShown: false,
                    animation: 'none',
                  }} 
                />
                <Stack.Screen 
                  name="tabs" 
                  options={{ 
                    headerShown: false,
                  }} 
                />
              </Stack>
            </SafeAreaProvider>
          </View>
        </DirectionProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
