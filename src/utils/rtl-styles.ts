/**
 * RTL-Aware Styling Utilities
 * 
 * Use these helpers to create styles that automatically flip for RTL languages.
 * 
 * Example usage:
 * ```tsx
 * import { rtl } from '@/src/utils/rtl-styles';
 * 
 * const styles = StyleSheet.create({
 *   container: {
 *     flexDirection: rtl.flexDirection('row'),
 *     ...rtl.paddingStart(16),
 *   },
 *   text: {
 *     textAlign: rtl.textAlign('left'),
 *   },
 * });
 * ```
 */

import { I18nManager, StyleSheet } from 'react-native';
import * as RTL from '@/src/lib/rtl';

/**
 * Consolidated RTL utilities with cleaner API
 */
export const rtl = {
  // Layout direction
  isRTL: () => I18nManager.isRTL,
  direction: () => I18nManager.isRTL ? 'rtl' : 'ltr' as const,
  
  // Flex utilities
  flexDirection: RTL.flexDirection,
  alignItems: RTL.alignItems,
  justifyContent: RTL.justifyContent,
  
  // Text alignment
  textAlign: RTL.textAlign,
  
  // Spacing utilities
  paddingStart: (value: number) => RTL.padding.start(value),
  paddingEnd: (value: number) => RTL.padding.end(value),
  paddingHorizontal: (start: number, end?: number) => ({
    ...RTL.padding.start(start),
    ...RTL.padding.end(end ?? start),
  }),
  
  marginStart: (value: number) => RTL.margin.start(value),
  marginEnd: (value: number) => RTL.margin.end(value),
  marginHorizontal: (start: number, end?: number) => ({
    ...RTL.margin.start(start),
    ...RTL.margin.end(end ?? start),
  }),
  
  // Positioning
  start: (value: number) => RTL.position.start(value),
  end: (value: number) => RTL.position.end(value),
  
  // Border radius
  borderRadiusStart: (top: number, bottom?: number) => ({
    ...RTL.borderRadius.topStart(top),
    ...RTL.borderRadius.bottomStart(bottom ?? top),
  }),
  borderRadiusEnd: (top: number, bottom?: number) => ({
    ...RTL.borderRadius.topEnd(top),
    ...RTL.borderRadius.bottomEnd(bottom ?? top),
  }),
  
  // Transform
  scaleX: RTL.transform.scaleX,
  translateX: RTL.transform.translateX,
  rotate: RTL.transform.rotate,
  
  // Icon rotation for directional icons (arrows, chevrons)
  flipIcon: () => I18nManager.isRTL ? { transform: [{ scaleX: -1 }] } : {},
};

/**
 * Common RTL-aware style patterns
 */
export const rtlStyles = StyleSheet.create({
  // Row layouts
  row: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  rowCenter: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Text alignment
  textStart: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  textEnd: {
    textAlign: I18nManager.isRTL ? 'left' : 'right',
  },
});

/**
 * TailwindCSS RTL class helper
 * Converts directional classes to RTL-aware versions
 */
export const rtlClass = (className: string): string => {
  if (!I18nManager.isRTL) return className;
  
  return className
    // Flex direction
    .replace(/flex-row(?!\-reverse)/g, 'flex-row-reverse')
    // Text alignment
    .replace(/text-left/g, 'text-right')
    .replace(/text-right/g, 'text-left')
    // Padding
    .replace(/pl-(\d+)/g, 'pr-$1')
    .replace(/pr-(\d+)/g, 'pl-$1')
    .replace(/ps-(\d+)/g, 'pe-$1')
    .replace(/pe-(\d+)/g, 'ps-$1')
    // Margin
    .replace(/ml-(\d+)/g, 'mr-$1')
    .replace(/mr-(\d+)/g, 'ml-$1')
    .replace(/ms-(\d+)/g, 'me-$1')
    .replace(/me-(\d+)/g, 'ms-$1')
    // Positioning
    .replace(/left-(\d+)/g, 'right-$1')
    .replace(/right-(\d+)/g, 'left-$1')
    // Border radius
    .replace(/rounded-l(?!eft)/g, 'rounded-r')
    .replace(/rounded-r(?!ight)/g, 'rounded-l')
    .replace(/rounded-tl/g, 'rounded-tr')
    .replace(/rounded-tr/g, 'rounded-tl')
    .replace(/rounded-bl/g, 'rounded-br')
    .replace(/rounded-br/g, 'rounded-bl');
};
