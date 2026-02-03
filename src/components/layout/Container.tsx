/**
 * Container Component
 * 
 * Standardized container that handles screen padding and RTL layout.
 * Based on design system: 16px margin, 20px gutter
 * 
 * Usage:
 * ```tsx
 * <Container>
 *   <Text>Content</Text>
 * </Container>
 * 
 * <Container scroll>
 *   <Text>Scrollable content</Text>
 * </Container>
 * 
 * <Container centered>
 *   <Text>Centered content</Text>
 * </Container>
 * ```
 */

import React from 'react';
import { View, ScrollView, ViewProps, ScrollViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/src/styles/theme';

// ============================================================================
// TYPES
// ============================================================================

interface BaseContainerProps {
  children: React.ReactNode;
  /** Enable scroll behavior */
  scroll?: boolean;
  /** Center content vertically and horizontally */
  centered?: boolean;
  /** Remove horizontal padding */
  noPadding?: boolean;
  /** Custom horizontal padding (overrides default 16px) */
  paddingHorizontal?: number;
  /** Add top padding (for screens without header) */
  paddingTop?: number;
  /** Add bottom padding (for screens with tab bar) */
  paddingBottom?: number;
  /** Additional class names for NativeWind */
  className?: string;
}

type ContainerProps = BaseContainerProps & (ViewProps | ScrollViewProps);

// ============================================================================
// COMPONENT
// ============================================================================

export function Container({
  children,
  scroll = false,
  centered = false,
  noPadding = false,
  paddingHorizontal,
  paddingTop,
  paddingBottom,
  className = '',
  style,
  ...rest
}: ContainerProps) {
  // Container styles with RTL-aware logical properties
  const containerStyle: ViewStyle = StyleSheet.flatten([
    styles.base,
    !noPadding && {
      paddingHorizontal: paddingHorizontal ?? theme.grid.margin,
    },
    paddingTop && { paddingTop },
    paddingBottom && { paddingBottom },
    centered && styles.centered,
    style,
  ]) as ViewStyle;

  // Render as ScrollView or View
  if (scroll) {
    return (
      <ScrollView
        className={`flex-1 ${className}`}
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
        {...(rest as ScrollViewProps)}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      className={`flex-1 ${className}`}
      style={containerStyle}
      {...(rest as ViewProps)}
    >
      {children}
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FFF', // vistaWhite - warm beige/cream
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * Screen container with standard padding for tab screens
 */
export function ScreenContainer({ children, ...props }: ContainerProps) {
  const insets = useSafeAreaInsets();
  
  // Tab bar height: 64px base + bottom inset + 16px margin + 8px breathing room
  const tabBarOffset = 64 + insets.bottom + 16 + 8;
  
  return (
    <Container
      paddingTop={0}  // No top padding - content starts at top
      paddingBottom={tabBarOffset}
      {...props}
    >
      {children}
    </Container>
  );
}

/**
 * Scrollable screen container
 */
export function ScrollContainer({ children, ...props }: ContainerProps) {
  return (
    <ScreenContainer scroll {...props}>
      {children}
    </ScreenContainer>
  );
}

export default Container;
