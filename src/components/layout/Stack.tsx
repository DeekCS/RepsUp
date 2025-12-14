/**
 * Stack Component
 * 
 * A vertical flex container (column layout).
 * Consistent spacing between children without manual margin handling.
 */

import React from 'react';
import { View, ViewStyle, ViewProps } from 'react-native';

interface StackProps extends ViewProps {
  /** Gap between children (multiplied by 4 for spacing scale) */
  gap?: number;
  /** Align items on cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify content on main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Fill available space */
  flex?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  children: React.ReactNode;
}

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
} as const;

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
} as const;

export function Stack({
  gap = 0,
  align = 'stretch',
  justify = 'start',
  flex = false,
  style,
  children,
  ...props
}: StackProps) {
  const stackStyle: ViewStyle = {
    flexDirection: 'column',
    alignItems: alignMap[align],
    justifyContent: justifyMap[justify],
    gap: gap * 4,
    ...(flex && { flex: 1 }),
  };

  return (
    <View style={[stackStyle, style]} {...props}>
      {children}
    </View>
  );
}

export default Stack;
