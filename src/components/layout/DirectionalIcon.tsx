/**
 * DirectionalIcon Component
 * 
 * Icons that should flip horizontally in RTL layouts (like arrows, chevrons).
 * Handles the transform automatically based on I18nManager.isRTL.
 */

import React from 'react';
import { View, ViewStyle, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

interface DirectionalIconProps {
  /** Icon name from Ionicons */
  name: IconName;
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
  /** Whether this icon should flip in RTL (default: true for directional icons) */
  flipInRTL?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

// Icons that should flip in RTL
const FLIPPABLE_ICONS: string[] = [
  'arrow-back',
  'arrow-forward',
  'chevron-back',
  'chevron-forward',
  'caret-back',
  'caret-forward',
  'arrow-back-outline',
  'arrow-forward-outline',
  'chevron-back-outline',
  'chevron-forward-outline',
  'play',
  'play-outline',
];

export function DirectionalIcon({
  name,
  size = 24,
  color = '#000',
  flipInRTL,
  style,
}: DirectionalIconProps) {
  const isRTL = I18nManager.isRTL ?? false;
  
  // Auto-detect if icon should flip, or use explicit prop
  const shouldFlip = flipInRTL ?? FLIPPABLE_ICONS.includes(name);
  
  const transform = shouldFlip && isRTL 
    ? [{ scaleX: -1 }] 
    : undefined;

  return (
    <View style={[{ transform }, style]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

export default DirectionalIcon;
