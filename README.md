# RepsUp - Workout Tracking App

A modern workout tracking application built with React Native, Expo Router, and NativeWind.

## Project Structure

```
RepsUp/
├── app/                      # Expo Router pages
│   ├── _layout.tsx          # Root layout with navigation
│   ├── index.tsx            # Splash/Landing screen
│   ├── tabs/                # Tab navigation screens
│   │   ├── _layout.tsx     # Tab bar configuration
│   │   ├── index.tsx       # Workouts screen
│   │   ├── progress.tsx    # Progress tracking screen
│   │   └── profile.tsx     # User profile screen
│   ├── auth/               # Authentication screens
│   ├── details/            # Detail view screens
│   └── workout-form/       # Workout creation/editing
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   └── features/       # Feature-specific components
│   ├── hooks/              # Custom React hooks
│   ├── store/              # State management
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types/interfaces
│   ├── styles/             # Global styles
│   └── lib/                # Constants and configurations
├── assets/                 # Static assets
│   ├── images/
│   ├── fonts/
│   ├── icons/
│   └── animations/
└── ...config files

```

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **NativeWind** - Tailwind CSS for React Native
- **TypeScript** - Type safety
- **i18next** - Internationalization (English & Arabic support)

## Getting Started

```bash
# Install dependencies
yarn install

# Start the development server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android
```

## Features

- 📱 Tab-based navigation
- 🎨 Modern UI with NativeWind/Tailwind
- 📊 Workout tracking
- 📈 Progress monitoring
- 👤 User profiles
- 🔄 State management ready
- 🎯 TypeScript for type safety
- 🌍 Multi-language support (English/Arabic)

## Development

The app uses path aliases for cleaner imports:
```typescript
import { Button } from '@/src/components/ui';
import { Workout } from '@/src/types';
```

### Internationalization & RTL Support

The app supports English and Arabic with full RTL (Right-to-Left) layout support. To use translations:

```typescript
import { useTranslation } from 'react-i18next';
import { useRTL } from '@/src/hooks/useRTL';

function MyComponent() {
  const { t } = useTranslation();
  const { isRTL, flexDirection, textAlign } = useRTL();
  
  return (
    <View style={{ flexDirection: flexDirection() }}>
      <Text style={{ textAlign: textAlign() }}>
        {t('welcome')}
      </Text>
    </View>
  );
}
```

**RTL/i18n Documentation:**
- 📚 [Quick Reference](./RTL_QUICK_REFERENCE.md) - Copy-paste snippets for RTL-aware components
- 📖 [Complete RTL Guide](./RTL_EXPO_IMPLEMENTATION.md) - Full implementation guide with examples

**Change Language:**
```typescript
import { useI18n } from '@/src/lib/I18nProvider';

function LanguageSwitcher() {
  const { setLanguage, toggleLanguage } = useI18n();
  
  // Switch to specific language
  await setLanguage('ar'); // Switch to Arabic
  
  // Or toggle between English and Arabic
  await toggleLanguage();
}
```

## License

0BSD
