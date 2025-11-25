import { I18nManager, TextStyle, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

/**
 * Hook to get RTL/LTR information and utilities
 * @returns Object with RTL state and helper functions
 */
export const useRTL = () => {
  const { i18n } = useTranslation();
  const isRTL = I18nManager.isRTL;
  const isArabic = i18n.language === 'ar';

  /**
   * Get appropriate margin/padding class based on RTL
   * @deprecated Use logical properties (marginStart, paddingEnd, etc.) instead
   */
  const getSpacingClass = (ltr: string, rtl: string) => {
    return isRTL ? rtl : ltr;
  };

  /**
   * Get flex direction for RTL
   */
  const getFlexDirection = (reverse = false): ViewStyle => {
    if (reverse) {
      return { flexDirection: isRTL ? 'row' : 'row-reverse' };
    }
    return { flexDirection: isRTL ? 'row-reverse' : 'row' };
  };

  /**
   * Get text alignment with writing direction
   */
  const getTextAlign = (align: 'left' | 'right' | 'center' | 'auto' = 'auto'): TextStyle => {
    if (align === 'center') {
      return { textAlign: 'center', writingDirection: isRTL ? 'rtl' : 'ltr' };
    }
    if (align === 'auto') {
      return {
        textAlign: isRTL ? 'right' : 'left',
        writingDirection: isRTL ? 'rtl' : 'ltr'
      };
    }
    return { textAlign: align, writingDirection: isRTL ? 'rtl' : 'ltr' };
  };

  /**
   * Get writing direction only
   */
  const getWritingDirection = (): TextStyle => {
    return { writingDirection: isRTL ? 'rtl' : 'ltr' };
  };

  /**
   * Create style object with logical properties for margins
   * Use these instead of marginLeft/marginRight for RTL support
   * 
   * @example
   * style={getLogicalMargin({ start: 10, end: 20, top: 5, bottom: 5 })}
   */
  const getLogicalMargin = (margins: {
    start?: number;
    end?: number;
    top?: number;
    bottom?: number;
    horizontal?: number;
    vertical?: number;
  }): ViewStyle => {
    const style: ViewStyle = {};
    
    if (margins.horizontal !== undefined) {
      style.marginStart = margins.horizontal;
      style.marginEnd = margins.horizontal;
    }
    if (margins.vertical !== undefined) {
      style.marginTop = margins.vertical;
      style.marginBottom = margins.vertical;
    }
    if (margins.start !== undefined) {
      style.marginStart = margins.start;
    }
    if (margins.end !== undefined) {
      style.marginEnd = margins.end;
    }
    if (margins.top !== undefined) {
      style.marginTop = margins.top;
    }
    if (margins.bottom !== undefined) {
      style.marginBottom = margins.bottom;
    }
    
    return style;
  };

  /**
   * Create style object with logical properties for padding
   * Use these instead of paddingLeft/paddingRight for RTL support
   * 
   * @example
   * style={getLogicalPadding({ start: 10, end: 20, top: 5, bottom: 5 })}
   */
  const getLogicalPadding = (paddings: {
    start?: number;
    end?: number;
    top?: number;
    bottom?: number;
    horizontal?: number;
    vertical?: number;
  }): ViewStyle => {
    const style: ViewStyle = {};
    
    if (paddings.horizontal !== undefined) {
      style.paddingStart = paddings.horizontal;
      style.paddingEnd = paddings.horizontal;
    }
    if (paddings.vertical !== undefined) {
      style.paddingTop = paddings.vertical;
      style.paddingBottom = paddings.vertical;
    }
    if (paddings.start !== undefined) {
      style.paddingStart = paddings.start;
    }
    if (paddings.end !== undefined) {
      style.paddingEnd = paddings.end;
    }
    if (paddings.top !== undefined) {
      style.paddingTop = paddings.top;
    }
    if (paddings.bottom !== undefined) {
      style.paddingBottom = paddings.bottom;
    }
    
    return style;
  };

  /**
   * Get position values that respect RTL
   * Use this for absolute positioning
   * 
   * @example
   * style={getLogicalPosition({ start: 10, top: 20 })}
   */
  const getLogicalPosition = (position: {
    start?: number;
    end?: number;
    top?: number;
    bottom?: number;
  }): ViewStyle => {
    const style: ViewStyle = {};
    
    if (position.start !== undefined) {
      if (isRTL) {
        style.right = position.start;
      } else {
        style.left = position.start;
      }
    }
    if (position.end !== undefined) {
      if (isRTL) {
        style.left = position.end;
      } else {
        style.right = position.end;
      }
    }
    if (position.top !== undefined) {
      style.top = position.top;
    }
    if (position.bottom !== undefined) {
      style.bottom = position.bottom;
    }
    
    return style;
  };

  /**
   * Transform style to flip horizontally for icons/images
   * Use for directional icons that need to flip in RTL
   * 
   * @example
   * style={getFlipTransform()}
   */
  const getFlipTransform = (): ViewStyle => {
    return {
      transform: [{ scaleX: isRTL ? -1 : 1 }]
    };
  };

  return {
    isRTL,
    isArabic,
    isLTR: !isRTL,
    getSpacingClass,
    getFlexDirection,
    getTextAlign,
    getWritingDirection,
    getLogicalMargin,
    getLogicalPadding,
    getLogicalPosition,
    getFlipTransform,
  };
};
