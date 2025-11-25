# RTL/LTR Implementation Using Expo Localization

This document describes how RTL (Right-to-Left) and LTR (Left-to-Right) layout support is implemented in this app following [Expo's official localization guide](https://docs.expo.dev/guides/localization/#dynamically-overriding-rtl-settings).

## Overview

The app supports both English (LTR) and Arabic (RTL) languages with proper layout direction handling on iOS, Android, and Web platforms.

## Configuration

### 1. App Configuration (`app.json`)

```json
{
  "expo": {
    "extra": {
      "supportsRTL": true
    },
    "plugins": [
      [
        "expo-localization",
        {
          "supportedLocales": ["en", "ar"]
        }
      ]
    ]
  }
}
```

**Key Points:**
- `extra.supportsRTL: true` enables RTL support globally
- `expo-localization` plugin with supported locales enables per-app language selection
- Supported locales are declared for both iOS and Android system settings

### 2. Required Dependencies

```json
{
  "expo-localization": "^15.x.x",
  "expo-updates": "^0.x.x",
  "@react-native-async-storage/async-storage": "^1.x.x",
  "i18next": "^23.x.x",
  "react-i18next": "^13.x.x"
}
```

## Implementation

### 1. Dynamic RTL Override (`src/lib/i18n.ts`)

Following Expo's documentation, we use `I18nManager` to dynamically override RTL settings:

```typescript
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeRTL = async (): Promise<'en' | 'ar'> => {
  const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  const lang = (savedLang as 'en' | 'ar') || 'ar';
  
  const shouldBeRTL = lang === 'ar';
  
  I18nManager.allowRTL(true);
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.forceRTL(shouldBeRTL);
    // App needs to reload to apply RTL changes
  }
  
  return lang;
};
```

**Key Points:**
- `I18nManager.allowRTL(true)` enables RTL support
- `I18nManager.forceRTL(shouldBeRTL)` sets the layout direction
- App reload is required on native platforms when RTL state changes
- This approach is recommended in [Expo's documentation](https://docs.expo.dev/guides/localization/#dynamically-overriding-rtl-settings)

### 2. Language Switching with Reload (`src/utils/language.ts`)

```typescript
import * as Updates from 'expo-updates';

export const changeLanguage = async (language: 'en' | 'ar') => {
  const shouldBeRTL = language === 'ar';
  const needsRTLChange = I18nManager.isRTL !== shouldBeRTL;
  
  if (needsRTLChange) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(shouldBeRTL);
    await i18n.changeLanguage(language);
    
    // Reload app to apply RTL changes (native only)
    if (Platform.OS !== 'web') {
      await Updates.reloadAsync();
    } else {
      window.location.reload();
    }
  } else {
    await i18n.changeLanguage(language);
  }
};
```

**Key Points:**
- Uses `expo-updates` to reload the app on native platforms
- Web uses `window.location.reload()`
- Only reloads when RTL state changes

### 3. Web Support (`app/_layout.tsx`)

For web platform, add the `dir` attribute to the root View:

```typescript
import { Platform } from 'react-native';
import { getLocales } from 'expo-localization';

<View 
  dir={Platform.OS === 'web' ? (I18nManager.isRTL ? 'rtl' : 'ltr') : undefined}
  style={{ flex: 1 }}
>
  {/* App content */}
</View>
```

**Key Points:**
- `dir` prop is required for web RTL support with react-native-web
- Sets to `'rtl'` or `'ltr'` based on current language
- Only applied on web platform

### 4. RTL Helper Hook (`src/hooks/useRTL.ts`)

Provides utilities for RTL-aware styling:

```typescript
export const useRTL = () => {
  const isRTL = I18nManager.isRTL;
  
  return {
    isRTL,
    isLTR: !isRTL,
    getLogicalMargin: (margins) => ({ marginStart, marginEnd, ... }),
    getLogicalPadding: (paddings) => ({ paddingStart, paddingEnd, ... }),
    getLogicalPosition: (position) => ({ left/right based on RTL }),
    getFlipTransform: () => ({ transform: [{ scaleX: isRTL ? -1 : 1 }] }),
    getTextAlign: () => ({ textAlign, writingDirection }),
  };
};
```

## Best Practices

### 1. Use Logical Properties

Instead of:
```typescript
style={{ marginLeft: 10, paddingRight: 20 }}
```

Use:
```typescript
style={{ marginStart: 10, paddingEnd: 20 }}
```

Or use the hook:
```typescript
const { getLogicalMargin } = useRTL();
style={getLogicalMargin({ start: 10, end: 20 })}
```

### 2. Text Alignment

For proper text alignment in RTL:

```typescript
const { getTextAlign } = useRTL();
<Text style={getTextAlign('auto')}>...</Text>
```

### 3. Flip Directional Icons

Icons like arrows that should flip in RTL:

```typescript
const { getFlipTransform } = useRTL();
<Icon style={getFlipTransform()} name="arrow-right" />
```

### 4. Absolute Positioning

For absolute positioning that respects RTL:

```typescript
const { getLogicalPosition } = useRTL();
<View style={[
  { position: 'absolute' },
  getLogicalPosition({ start: 10, top: 20 })
]} />
```

## Platform-Specific Notes

### iOS
- RTL changes require app reload
- Per-app language can be set in system settings
- Layout automatically flips when RTL is enabled

### Android
- RTL changes require app reload
- Per-app language can be set in system settings (Android 13+)
- Layout automatically flips when RTL is enabled

### Web
- RTL changes are instant (no reload needed)
- Requires `dir` attribute on root View
- Uses CSS for RTL layout

## Testing

To test RTL layout:

1. **Change language in app**: Use the language switcher component
2. **Change device language**: Go to device settings and change language to Arabic
3. **Force RTL in code**: Set `extra.forcesRTL: true` in `app.json` for testing

## Limitations

### Known Issues
- App reload is required on native platforms when switching between RTL/LTR
- Expo Go resets RTL preferences when opening launcher or projects
- Some third-party components may not support RTL out of the box

### Workarounds
- Always test RTL in development builds or production builds
- Use logical properties instead of left/right
- Wrap third-party components with RTL-aware containers

## References

- [Expo Localization Guide](https://docs.expo.dev/guides/localization/)
- [Dynamic RTL Override](https://docs.expo.dev/guides/localization/#dynamically-overriding-rtl-settings)
- [React Native I18nManager](https://reactnative.dev/docs/i18nmanager)
- [React Native RTL Blog](https://reactnative.dev/blog/2016/08/19/right-to-left-support-for-react-native-apps)
