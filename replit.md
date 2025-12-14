# RepsUp - Workout Tracking App

## Overview

RepsUp is a mobile workout tracking application built with React Native and Expo. The app allows users to track exercises, sets, and reps to monitor their fitness progress. It features a modern UI with tab-based navigation, phone authentication with OTP verification, and full internationalization support with RTL/LTR layout handling for English and Arabic languages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React Native with Expo SDK 54** - Cross-platform mobile development
- **Expo Router** - File-based navigation system where routes are defined by the file structure in `/app`
- **TypeScript** - Static typing throughout the codebase

### Styling System
- **NativeWind 4.2** - Tailwind CSS integration for React Native
- **Custom Design Tokens** - Colors defined in `tailwind.config.js` (fadedOrange, birch, etc.)
- **DM Sans Font Family** - Loaded via `@expo-google-fonts/dm-sans`

### Internationalization Architecture
The app uses a production-grade i18n setup with RTL support:

1. **i18next + react-i18next** - Translation framework with nested keys, interpolation, and plurals
2. **expo-localization** - Device locale detection
3. **AsyncStorage** - Persists user language preference
4. **I18nManager** - Native RTL/LTR direction control

**Key Files:**
- `src/lib/i18n.ts` - i18next configuration
- `src/lib/I18nProvider.tsx` - Centralized context provider (replaces LocalizationProvider)
- `src/lib/rtl.ts` - RTL utilities and direction management
- `src/locales/en/translation.json` & `ar/translation.json` - Translation files

**Usage:**
```tsx
import { I18nProvider, useI18n } from '../src/lib/I18nProvider';
import { useTranslation } from 'react-i18next';

// In components:
const { toggleLanguage, getToggleLabel, isRTL } = useI18n();
const { t } = useTranslation();
```

**RTL Strategy:** When language direction changes (e.g., English→Arabic), the app triggers a single restart to apply `I18nManager.forceRTL()`. This is the standard approach used by production apps.

### Navigation Structure
```
/app
├── index.tsx           # Splash screen → redirects to login
├── _layout.tsx         # Root layout with providers
├── auth/
│   ├── login.tsx       # Phone number entry
│   └── verify-otp.tsx  # OTP verification
└── tabs/
    ├── _layout.tsx     # Tab bar configuration
    ├── index.tsx       # Workouts (home)
    ├── add.tsx         # Create workout
    ├── history.tsx     # Past workouts
    ├── progress.tsx    # Statistics
    └── profile.tsx     # User settings
```

### Component Architecture
- **`/src/components/ui/`** - Reusable primitives (Button, Card, PhoneInput, Toggle)
- **`/src/components/layout/`** - Direction-aware containers (Row, Stack, ScreenContainer, DirectionalIcon)
- **`/src/components/features/`** - Feature-specific components (LanguageSwitcher)

Layout components like `Row` use `flexDirection: 'row'` which React Native automatically flips in RTL mode, eliminating per-component `isRTL` conditionals.

### State Management
Currently using React Context for localization state. No external state management library installed yet - local component state handles form inputs and UI state.

### Authentication Flow
Static/mock authentication flow:
1. User enters phone number on login screen
2. Navigates to OTP verification screen
3. On successful OTP entry, redirects to main tabs

No backend integration currently implemented.

## External Dependencies

### Core Expo Modules
- `expo-router` - Navigation
- `expo-font` - Custom font loading
- `expo-localization` - Device locale detection with RTL plugin
- `expo-image` - Optimized image component
- `expo-blur` - BlurView for tab bar
- `expo-splash-screen` - Splash screen management

### UI/Animation
- `react-native-reanimated` - Animation library
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native screen containers
- `react-native-otp-entry` - OTP input component
- `react-native-keyboard-controller` - Keyboard management

### Storage
- `@react-native-async-storage/async-storage` - Persistent key-value storage for language preference

### Development
- `expo-dev-client` - Custom development client
- `expo-updates` - OTA updates support

### No Backend/Database
The app currently has no backend integration, database, or API services configured. All data is mock/static.