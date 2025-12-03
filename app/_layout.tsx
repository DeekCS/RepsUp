import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import '../global.css';
// Import localization provider - handles RTL initialization
import { LocalizationProvider, useLocalization } from '../src/lib/LocalizationProvider';


// Prevent splash from auto-hiding
SplashScreen.preventAutoHideAsync();

// Navigation theme configuration
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

// ============================================================================
// LOADING COMPONENT
// ============================================================================

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#5B5FEF" />
    </View>
  );
}

// ============================================================================
// NAVIGATION LAYOUT
// ============================================================================

function NavigationLayout() {
  return (
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
  );
}

// ============================================================================
// APP CONTENT (Rendered after localization is ready)
// ============================================================================

function AppContent() {
  const { isReady: isLocalizationReady } = useLocalization();
  const [fontsLoaded] = useFonts({
    'DMSans-Regular': DMSans_400Regular,
    'DMSans-Medium': DMSans_500Medium,
    'DMSans-Bold': DMSans_700Bold,
  });

  // Track if app is fully ready
  const isAppReady = fontsLoaded && isLocalizationReady;

  // Hide splash screen when everything is ready
  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  // Don't render until everything is loaded
  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ThemeProvider value={navigationTheme}>
        <SafeAreaProvider>
          <NavigationLayout />
        </SafeAreaProvider>
      </ThemeProvider>
    </View>
  );
}

// ============================================================================
// ROOT LAYOUT
// ============================================================================

export default function RootLayout() {
  return (
    <LocalizationProvider loadingComponent={<LoadingScreen />}>
      <AppContent />
    </LocalizationProvider>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
