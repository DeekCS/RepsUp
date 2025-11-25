import React, { createContext, useContext, useMemo } from 'react';
import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';

type Direction = 'ltr' | 'rtl';

interface DirectionContextType {
  direction: Direction;
  isRTL: boolean;
}

const DirectionContext = createContext<DirectionContextType>({
  direction: 'ltr',
  isRTL: false,
});

export const useDirection = () => useContext(DirectionContext);

interface DirectionProviderProps {
  children: React.ReactNode;
}

/**
 * DirectionProvider - Provides RTL/LTR direction context for the app
 * 
 * This context is essential for:
 * 1. React Navigation's direction awareness (tabs, stack animations)
 * 2. Consistent direction state across all components
 * 3. Theme-based direction styling
 */
export const DirectionProvider: React.FC<DirectionProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  
  const value = useMemo<DirectionContextType>(() => {
    // Use I18nManager.isRTL as the source of truth (set during app initialization)
    const isRTL = I18nManager.isRTL;
    return {
      direction: isRTL ? 'rtl' : 'ltr',
      isRTL,
    };
  }, [i18n.language]);
  
  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
};
