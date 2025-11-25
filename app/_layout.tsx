import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { ThemeProvider } from '@react-navigation/native';
import { DefaultTheme } from '@react-navigation/native';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'DMSans-Regular': DMSans_400Regular,
    'DMSans-Medium': DMSans_500Medium,
    'DMSans-Bold': DMSans_700Bold,
  });

  // Hide splash screen when ready
  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  // Don't render until fonts are loaded
  if (!fontsLoaded || !isReady) {
    return null;
  }

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
    <ThemeProvider value={navigationTheme}>
      <View style={{ flex: 1 }}>
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
    </ThemeProvider>
  );
}
