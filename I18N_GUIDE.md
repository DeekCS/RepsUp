# 🌍 Internationalization (i18n) Setup Guide

## Overview

This project uses **i18next** with **react-i18next** for internationalization, supporting **English (en)** and **Arabic (ar)** languages. This is the most modern and widely-used i18n solution for React Native apps in 2025.

## 📦 Packages Used

- **i18next** - Core internationalization framework
- **react-i18next** - React bindings for i18next
- **expo-localization** - Auto-detect device language

## 🏗️ Project Structure

```
src/
├── lib/
│   └── i18n.ts                    # i18next configuration
├── locales/
│   ├── en/
│   │   └── translation.json       # English translations
│   └── ar/
│       └── translation.json       # Arabic translations
├── utils/
│   └── language.ts                # Language utilities
└── components/
    └── features/
        └── LanguageSwitcher.tsx   # Language switcher component
```

## 🚀 Quick Start

### 1. Using translations in your components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Text>{t('auth.login.title')}</Text>
    </View>
  );
}
```

### 2. With interpolation (dynamic values)

```tsx
const { t } = useTranslation();
const name = "Ahmed";

<Text>{t('greeting', { name })}</Text>
```

Translation file:
```json
{
  "greeting": "Hello {{name}}!"
}
```

### 3. Change language programmatically

```tsx
import { changeLanguage } from '../src/utils/language';

// Change to Arabic
await changeLanguage('ar');

// Change to English
await changeLanguage('en');
```

### 4. Use the LanguageSwitcher component

```tsx
import { LanguageSwitcher } from '../src/components/features/LanguageSwitcher';

function SettingsScreen() {
  return (
    <View>
      <LanguageSwitcher variant="dropdown" />
    </View>
  );
}
```

## 📝 Adding New Translations

### Step 1: Add to English file (`src/locales/en/translation.json`)

```json
{
  "newFeature": {
    "title": "My New Feature",
    "description": "This is a new feature"
  }
}
```

### Step 2: Add Arabic translation (`src/locales/ar/translation.json`)

```json
{
  "newFeature": {
    "title": "ميزتي الجديدة",
    "description": "هذه ميزة جديدة"
  }
}
```

### Step 3: Use in your component

```tsx
<Text>{t('newFeature.title')}</Text>
<Text>{t('newFeature.description')}</Text>
```

## 🎯 Best Practices

### 1. **Organize by Feature**
```json
{
  "auth": {
    "login": { ... },
    "signup": { ... }
  },
  "profile": {
    "settings": { ... }
  }
}
```

### 2. **Use Nested Keys**
```tsx
// ✅ Good
t('auth.login.title')

// ❌ Avoid
t('authLoginTitle')
```

### 3. **Keep Translations Simple**
```json
// ✅ Good
{
  "welcome": "Welcome to RepsUp"
}

// ❌ Avoid HTML or complex formatting
{
  "welcome": "<strong>Welcome</strong> to <em>RepsUp</em>"
}
```

### 4. **Use Interpolation for Dynamic Content**
```json
{
  "itemCount": "You have {{count}} items"
}
```

```tsx
<Text>{t('itemCount', { count: 5 })}</Text>
```

### 5. **Handle Plurals**
```json
{
  "apple_one": "{{count}} apple",
  "apple_other": "{{count}} apples"
}
```

```tsx
<Text>{t('apple', { count: 1 })}</Text>  // "1 apple"
<Text>{t('apple', { count: 5 })}</Text>  // "5 apples"
```

## 🌐 RTL (Right-to-Left) Support

For Arabic, you may need to handle RTL layout:

```tsx
import { I18nManager } from 'react-native';
import { isRTL } from '../src/utils/language';

// Check if current language is RTL
if (isRTL()) {
  // Apply RTL-specific styles
  I18nManager.forceRTL(true);
}
```

## 🔧 Utility Functions

### `changeLanguage(language)`
Changes the app language
```tsx
await changeLanguage('ar');
```

### `getCurrentLanguage()`
Gets the current language code
```tsx
const currentLang = getCurrentLanguage(); // 'en' or 'ar'
```

### `isRTL()`
Checks if current language is right-to-left
```tsx
if (isRTL()) {
  // Apply RTL styles
}
```

## 📱 Language Detection

The app automatically detects the device language on first launch. If the device language is Arabic, it defaults to Arabic, otherwise English.

You can customize this in `src/lib/i18n.ts`:

```typescript
const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
```

## 🎨 Styling for Different Languages

```tsx
const { i18n } = useTranslation();

<Text 
  style={[
    styles.text,
    i18n.language === 'ar' && styles.rtlText
  ]}
>
  {t('message')}
</Text>
```

## 🧪 Testing

Test language switching:
1. Open the app
2. Go to settings/profile
3. Use the LanguageSwitcher component
4. Verify all text updates correctly

## 📚 Additional Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Expo Localization](https://docs.expo.dev/versions/latest/sdk/localization/)

## 🔥 Advanced Features

### Namespaces (for large apps)
Split translations into multiple files:
```typescript
i18next.init({
  ns: ['common', 'auth', 'profile'],
  defaultNS: 'common'
});
```

### Context-based translations
```json
{
  "friend_male": "He is my friend",
  "friend_female": "She is my friend"
}
```

```tsx
<Text>{t('friend', { context: 'male' })}</Text>
```

### Backend Integration
Load translations from a server:
```typescript
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .init({
    backend: {
      loadPath: 'https://api.yourapp.com/locales/{{lng}}/{{ns}}.json'
    }
  });
```

## 🎯 Migration Checklist

- [x] Install packages
- [x] Setup i18n configuration
- [x] Create translation files (en/ar)
- [x] Integrate with app root
- [x] Create utility functions
- [x] Create LanguageSwitcher component
- [x] Update example screen (login)
- [ ] Update all screens with translations
- [ ] Add AsyncStorage for language persistence
- [ ] Test on iOS and Android
- [ ] Test RTL layout for Arabic

## 💡 Pro Tips

1. **Always provide fallback**: Set `fallbackLng: 'en'` to avoid missing translations
2. **Use TypeScript**: Add type checking for translation keys
3. **Lazy loading**: For large apps, load translations on-demand
4. **Translation management**: Consider using [locize](https://locize.com/) for professional translation management
5. **Performance**: Memoize translation functions in performance-critical components

---

**Need help?** Check the [i18next documentation](https://www.i18next.com/) or [react-i18next documentation](https://react.i18next.com/).
