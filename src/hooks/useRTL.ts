/**
 * RTL Hook
 * 
 * Uses I18nManager.isRTL as the source of truth.
 * RTL state is correct after the single restart when direction changes.
 */

import { useMemo } from 'react';
import { I18nManager, ViewStyle } from 'react-native';

import { useLocalization } from '../lib/LocalizationProvider';

// ============================================================================
// TYPES
// ============================================================================

export interface UseRTLReturn {
  isRTL: boolean;
  isLTR: boolean;
  currentLanguage: string;
  flexDirection: (reverse?: boolean) => 'row' | 'row-reverse';
  textAlign: () => 'left' | 'right';
  alignStart: () => 'flex-start' | 'flex-end';
  alignEnd: () => 'flex-start' | 'flex-end';
  rtlTransform: (value: number) => number;
  marginStart: (value: number) => ViewStyle;
  marginEnd: (value: number) => ViewStyle;
}

// ============================================================================
// HOOK
// ============================================================================

export const useRTL = (): UseRTLReturn => {
  const { language, isRTL } = useLocalization();

  return useMemo(() => ({
    isRTL,
    isLTR: !isRTL,
    currentLanguage: language,

    flexDirection: (reverse = false) => {
      if (reverse) return isRTL ? 'row' : 'row-reverse';
      return isRTL ? 'row-reverse' : 'row';
    },

    textAlign: () => isRTL ? 'right' : 'left',
    alignStart: () => isRTL ? 'flex-end' : 'flex-start',
    alignEnd: () => isRTL ? 'flex-start' : 'flex-end',
    rtlTransform: (value: number) => isRTL ? -value : value,
    marginStart: (value: number): ViewStyle => ({ marginStart: value }),
    marginEnd: (value: number): ViewStyle => ({ marginEnd: value }),
  }), [isRTL, language]);
};

// ============================================================================
// STATIC UTILITIES
// ============================================================================

export const isLayoutRTL = (): boolean => I18nManager.isRTL;

export const getFlexDirection = (reverse = false): 'row' | 'row-reverse' => {
  const isRTL = I18nManager.isRTL;
  if (reverse) return isRTL ? 'row' : 'row-reverse';
  return isRTL ? 'row-reverse' : 'row';
};

export const getTextAlign = (): 'left' | 'right' => {
  return I18nManager.isRTL ? 'right' : 'left';
};

export default useRTL;
