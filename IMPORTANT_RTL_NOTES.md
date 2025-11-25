# RTL Implementation Notes

## How RTL Works in React Native

### Critical Understanding:
1. `I18nManager.forceRTL(true/false)` sets a **native flag**
2. This flag is **only read on app startup**
3. Changes to RTL require a **full native app restart** - React remounting is NOT enough

### Current Implementation:

#### On App Launch (`src/lib/i18n.ts`):
```typescript
// This code runs BEFORE React renders anything
AsyncStorage.getItem('@app_language').then(lang => {
  const shouldBeRTL = lang === 'ar';
  I18nManager.forceRTL(shouldBeRTL);  // ← Sets native flag
  i18next.changeLanguage(lang);
});
```

#### On Language Change (`src/utils/language.ts`):
```typescript
export const changeLanguage = async (language: 'en' | 'ar') => {
  await AsyncStorage.setItem('@app_language', language);
  I18nManager.forceRTL(language === 'ar');  // ← Sets flag for NEXT launch
  await i18next.changeLanguage(language);    // ← Updates text immediately
  RNRestart.restart();                       // ← RESTARTS app to apply RTL
};
```

### Why This Works:

1. **First Launch**: 
   - App reads saved language from AsyncStorage
   - Sets RTL flag BEFORE any React components render
   - All UI renders with correct RTL/LTR from the start

2. **Language Switch**:
   - Saves new language to AsyncStorage
   - Sets RTL flag (will be read on next launch)
   - Changes i18next language (updates text)
   - **Restarts entire app** using `react-native-restart`
   - On restart, step 1 happens again with new language

### Testing:

1. **Test RTL (Arabic)**:
   - Open app → Should show Arabic text aligned RIGHT
   - All elements should flow right-to-left

2. **Switch to LTR (English)**:
   - Tap English → App restarts
   - Should show English text aligned LEFT
   - All elements should flow left-to-right

3. **Switch back to RTL**:
   - Tap Arabic → App restarts
   - Back to right-aligned Arabic

### Troubleshooting:

**Problem**: Text shows in Arabic but aligned LEFT
**Cause**: `I18nManager.isRTL` is still `false`
**Solution**: 
- Kill the app completely (swipe away from app switcher)
- Reopen the app
- RTL flag will now be read correctly

**Problem**: After switching language, layout doesn't flip
**Cause**: `react-native-restart` might not be working
**Solution**:
- Check if `react-native-restart` is installed: `yarn list react-native-restart`
- Try rebuilding: `npx expo prebuild --clean` then `npx expo run:ios`
- In development, you may need to manually restart the app

**Problem**: In Expo Go, RTL doesn't work
**Cause**: Expo Go has limitations with native modules
**Solution**: 
- Use EAS Build: `eas build --profile development --platform ios`
- Or use development build: `npx expo run:ios`

### Key Files:
- `/src/lib/i18n.ts` - RTL initialization on app start
- `/src/utils/language.ts` - Language switching logic
- `/app/_layout.tsx` - Root component with key-based remounting
- `/src/hooks/useRTL.ts` - RTL utilities for components

### Remember:
- ✅ Text changes happen instantly with i18next
- ✅ RTL layout changes require full app restart
- ✅ Always save language to AsyncStorage BEFORE restarting
- ✅ On restart, saved language is read and RTL is set correctly
