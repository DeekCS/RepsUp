/**
 * Row Component
 * 
 * A horizontal flex container that automatically respects RTL direction.
 * Uses flexDirection: 'row' which React Native automatically flips in RTL.
 * 
 * NO isRTL conditionals needed - React Native handles the flip.
 */

import React from 'react';
import { View, ViewStyle, StyleSheet, ViewProps } from 'react-native';

interface RowProps extends ViewProps {
  /** Gap between children (multiplied by 4 for spacing scale) */
  gap?: number;
  /** Align items on cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content on main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Wrap children to next line */
  wrap?: boolean;
  /** Reverse the row direction (start becomes end) */
  reverse?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  children: React.ReactNode;
}

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
} as const;

export function Row({
  gap = 0,
  align = 'center',
  justify = 'start',
  wrap = false,
  reverse = false,
  style,
  children,
  ...props
}: RowProps) {
  const rowStyle: ViewStyle = {
    flexDirection: reverse ? 'row-reverse' : 'row',
    alignItems: alignMap[align],
    justifyContent: justifyMap[justify],
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: gap * 4,
  };

  return (
    <View style={[rowStyle, style]} {...props}>
      {children}
    </View>
  );
}

export default Row;
