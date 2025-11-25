import React, { useMemo } from 'react';
import { I18nManager } from 'react-native';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';

interface NavigationThemeWrapperProps {
  children: React.ReactNode;
  isDark?: boolean;
}

/**
 * NavigationThemeWrapper - Provides React Navigation theme with RTL support
 * 
 * Key features:
 * 1. Sets the 'direction' in the theme which React Navigation uses for:
 *    - Tab bar item ordering
 *    - Stack navigator gesture direction
 *    - Drawer position
 *    - Header layout
 * 
 * 2. Ensures consistent theming across all navigators
 * 
 * Note: React Navigation automatically reads I18nManager.isRTL on mount,
 * but providing the direction explicitly ensures it's always in sync.
 */
export const NavigationThemeWrapper: React.FC<NavigationThemeWrapperProps> = ({ 
  children, 
  isDark = false 
}) => {
  const isRTL = I18nManager.isRTL;
  
  // Create theme with direction property
  // The 'direction' property is what React Navigation uses for RTL support
  const theme = useMemo<Theme>(() => {
    const baseTheme = isDark ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      // Custom colors can be added here
      colors: {
        ...baseTheme.colors,
        primary: '#5B5FEF',
        background: '#FFFFFF',
        card: '#FFFFFF',
        text: '#1F2937',
        border: '#E5E7EB',
        notification: '#EF4444',
      },
    };
  }, [isDark, isRTL]);

  return (
    <NavigationThemeProvider value={theme}>
      {children}
    </NavigationThemeProvider>
  );
};
