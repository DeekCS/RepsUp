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

## Development

The app uses path aliases for cleaner imports:
```typescript
import { Button } from '@/src/components/ui';
import { Workout } from '@/src/types';
```

## License

0BSD
