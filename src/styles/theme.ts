// Design System Theme
// Based on DM Sans typography and defined color palette

export const theme = {
  // Typography
  fonts: {
    regular: 'DMSans-Regular',
    medium: 'DMSans-Medium',
    bold: 'DMSans-Bold',
  },
  
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Color Palette
  colors: {
    // Primary Colors
    fadedOrange: '#FF8643',      // 1 - Primary brand color
    dustyGrey: '#A79D95',        // 2 - Secondary neutral
    vistaWhite: '#FEF3F6',       // 3 - Light background
    birch: '#3D3D26',            // 4 - Dark text/background
    dustyGreyAlt: '#A39499',     // 5 - Alternative grey
    merino: '#F8E6E4',           // 6 - Light accent
    nobel: '#B3B2B0',            // 7 - Medium grey
    greenWhite: '#EAE8E4',       // 8 - Off-white
    chilliPepper: '#C81213',     // 9 - Error/Alert color
    
    // Semantic Colors
    primary: '#FF8643',
    secondary: '#3D3D26',
    background: '#FFFFFF',
    surface: '#FEF3F6',
    error: '#C81213',
    text: {
      primary: '#3D3D26',
      secondary: '#A79D95',
      light: '#B3B2B0',
      white: '#FFFFFF',
    },
    border: {
      light: '#EAE8E4',
      default: '#B3B2B0',
      dark: '#A79D95',
    },
  },

  // Grid System
  grid: {
    columns: 4,              // 4 column stretch
    gutter: 20,              // 20px gutter
    margin: 16,              // 16px margin
    containerPadding: 16,    // Horizontal padding
  },

  // Spacing System (based on 4px base unit)
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },

  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },

  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },

  // Layout
  layout: {
    screenPadding: 16,
    cardPadding: 16,
    sectionSpacing: 24,
  },
} as const;

export type Theme = typeof theme;
