import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useEffect, useState } from 'react';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'DMSans-Regular': DMSans_400Regular,
    'DMSans-Medium': DMSans_500Medium,
    'DMSans-Bold': DMSans_700Bold,
  });

  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaProvider>
      <KeyboardProvider>
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
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
