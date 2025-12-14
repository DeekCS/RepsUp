/**
 * ScreenContainer Component
 * 
 * A base container for screens with consistent padding and safe area handling.
 * Automatically respects RTL direction without any conditionals.
 */

import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  /** Children to render */
  children: React.ReactNode;
  /** Background color */
  backgroundColor?: string;
  /** Horizontal padding (multiplied by 4) */
  paddingHorizontal?: number;
  /** Include safe area padding at top */
  safeTop?: boolean;
  /** Include safe area padding at bottom */
  safeBottom?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export function ScreenContainer({
  children,
  backgroundColor = 'transparent',
  paddingHorizontal = 4,
  safeTop = false,
  safeBottom = false,
  style,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
    // Use paddingStart/paddingEnd for RTL-aware horizontal padding
    paddingStart: paddingHorizontal * 4,
    paddingEnd: paddingHorizontal * 4,
    ...(safeTop && { paddingTop: insets.top }),
    ...(safeBottom && { paddingBottom: insets.bottom }),
  };

  return (
    <View style={[containerStyle, style]}>
      {children}
    </View>
  );
}

export default ScreenContainer;
