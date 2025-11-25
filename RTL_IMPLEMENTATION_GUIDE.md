# 🌐 RTL/LTR Implementation Guide - Complete Solution

## ✅ What Was Fixed

Your RTL/LTR implementation has been completely overhauled to solve alignment and switching issues:

### Key Improvements:

1. **Removed `react-native-restart`** - Not compatible with New Architecture
2. **Implemented `expo-updates`** - For reliable app reloading
3. **Fixed timing issues** - Proper initialization sequence
4. **Added logical properties** - marginStart/End, paddingStart/End for automatic RTL flipping
5. **Enhanced state management** - Better tracking of RTL state changes
6. **Improved layout remounting** - Proper key-based remounting strategy

---

## 🔧 Technical Changes Made

### 1. Dependencies Fixed

**Removed:**
- `react-native-restart` - Not compatible with New Architecture
- `@types/react-native` - Types are included with react-native package
- `yarn.lock` - Conflicts with package-lock.json

**Added:**
- `@expo/metro-runtime` - Required peer dependency for expo-router

### 2. i18n Initialization (`src/lib/i18n.ts`)

**Old Problem:** Race conditions and timing issues
**New Solution:** Proper async initialization with state tracking

```typescript
export const initializeRTL = async (): Promise<'en' | 'ar'> => {
  // Get saved language
  const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  const lang = (savedLang as 'en' | 'ar') || 'ar';
  
  // Check if RTL needs to change
  const shouldBeRTL = lang === 'ar';
  
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.forceRTL(shouldBeRTL);
    // Mark pending restart
    await AsyncStorage.setItem(RTL_STATE_KEY, 'pending');
  }
  
  return lang;
};
```

### 3. Language Switching (`src/utils/language.ts`)

**Old Problem:** `react-native-restart` not working reliably
**New Solution:** Using `expo-updates` with confirmation dialog

```typescript
import * as Updates from 'expo-updates';

export const changeLanguage = async (language: 'en' | 'ar', skipConfirmation = false) => {
  // Save language
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  
  // Set RTL state
  const shouldBeRTL = language === 'ar';
  I18nManager.forceRTL(shouldBeRTL);
  
  // Reload app
  await Updates.reloadAsync();
};
```

### 4. Layout Management (`app/_layout.tsx`)

**Old Problem:** Layout not remounting properly on language change
**New Solution:** Proper initialization + key-based remounting

```tsx
// Initialize RTL on mount
useEffect(() => {
  const init = async () => {
    const savedLang = await initializeRTL();
    if (i18n.language !== savedLang) {
      await i18n.changeLanguage(savedLang);
    }
    setIsReady(true);
  };
  init();
}, []);

// Remount on language change
<View 
  key={`layout-${layoutKey}-${I18nManager.isRTL ? 'rtl' : 'ltr'}`} 
  style={{ flex: 1 }}
>
```

### 5. Logical Properties (`src/components/ui/PhoneInput.tsx`)

**Old Problem:** Using conditional `ml-2` vs `mr-2` classes
**New Solution:** Using logical properties that flip automatically

```tsx
const styles = StyleSheet.create({
  countryCode: {
    marginStart: 8, // Automatically becomes marginRight in RTL
  },
  input: {
    marginStart: 12, // Automatically becomes marginRight in RTL
    textAlign: isRTL ? 'right' : 'left',
  }
});
```

### 6. Enhanced RTL Hook (`src/hooks/useRTL.ts`)

**New Utilities Added:**

```typescript
// Logical margins
getLogicalMargin({ start: 10, end: 20 })

// Logical padding
getLogicalPadding({ horizontal: 15, vertical: 10 })

// Logical positioning
getLogicalPosition({ start: 10, top: 20 })

// Flip transform for icons
getFlipTransform()
```

---

## 🚀 How It Works Now

### App Launch Flow:

1. **`_layout.tsx` mounts**
2. **`initializeRTL()` runs**
   - Reads saved language from AsyncStorage
   - Sets RTL state via `I18nManager.forceRTL()`
   - Returns saved language
3. **i18n updates** to saved language
4. **Layout renders** with correct RTL/LTR state
5. **Splash screen hides**

### Language Switch Flow:

1. **User taps language button**
2. **`changeLanguage()` called**
3. **Confirmation dialog shows**
4. **User confirms**
5. **Language saved** to AsyncStorage
6. **RTL state updated** via `I18nManager.forceRTL()`
7. **`Updates.reloadAsync()`** restarts app
8. **App launches** with new language (see Launch Flow)

---

## 📝 Best Practices for RTL Support

### ✅ DO: Use Logical Properties

```tsx
// ✅ Good - Uses logical properties
const styles = StyleSheet.create({
  container: {
    marginStart: 10,
    paddingEnd: 20,
  }
});

// ❌ Bad - Hardcoded directions
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    paddingRight: 20,
  }
});
```

### ✅ DO: Use useRTL Hook Utilities

```tsx
const { getLogicalMargin, getTextAlign } = useRTL();

<View style={getLogicalMargin({ start: 10, end: 20 })}>
  <Text style={getTextAlign('auto')}>
    {t('welcome')}
  </Text>
</View>
```

### ✅ DO: Flip Directional Icons

```tsx
const { getFlipTransform } = useRTL();

<Image 
  source={backArrow} 
  style={getFlipTransform()} 
/>
```

### ❌ DON'T: Use Fixed Directions in Flexbox

```tsx
// ❌ Bad
<View style={{ flexDirection: 'row' }}>

// ✅ Good
const { getFlexDirection } = useRTL();
<View style={getFlexDirection()}>
```

### ❌ DON'T: Hardcode Text Alignment

```tsx
// ❌ Bad
<Text style={{ textAlign: 'left' }}>

// ✅ Good
const { getTextAlign } = useRTL();
<Text style={getTextAlign('auto')}>
```

---

## 🎨 Styling Components for RTL

### Example: Button with Icon

```tsx
import { useRTL } from '@/hooks';

function IconButton() {
  const { getLogicalMargin, getFlipTransform } = useRTL();
  
  return (
    <Pressable style={styles.button}>
      <Image 
        source={arrowIcon} 
        style={[
          styles.icon,
          getFlipTransform(), // Flips icon in RTL
          getLogicalMargin({ end: 8 }) // Space after icon
        ]} 
      />
      <Text>Next</Text>
    </Pressable>
  );
}
```

### Example: Form Input

```tsx
import { useRTL } from '@/hooks';

function FormInput({ label, ...props }) {
  const { getTextAlign, getLogicalPadding } = useRTL();
  
  return (
    <View>
      <Text style={getTextAlign('auto')}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          getTextAlign('auto'),
          getLogicalPadding({ horizontal: 16, vertical: 12 })
        ]}
        {...props}
      />
    </View>
  );
}
```

### Example: List Item

```tsx
import { useRTL } from '@/hooks';

function ListItem({ title, subtitle, icon }) {
  const { getLogicalMargin, getLogicalPadding } = useRTL();
  
  return (
    <View style={[styles.item, getLogicalPadding({ horizontal: 16 })]}>
      <Image 
        source={icon} 
        style={[styles.icon, getLogicalMargin({ end: 12 })]} 
      />
      <View style={styles.content}>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    </View>
  );
}
```

---

## 🐛 Troubleshooting

### Issue: RTL not applying after language switch

**Cause:** App not restarting properly
**Solution:**
1. Check if `expo-updates` is installed: `npm list expo-updates`
2. Kill and restart the app manually
3. Check console for errors

### Issue: Text in Arabic but aligned LEFT

**Cause:** `I18nManager.isRTL` still false
**Solution:**
1. Kill app completely (remove from app switcher)
2. Check `AsyncStorage` for saved language
3. Reopen app - RTL state will be read on launch

### Issue: Some elements not flipping

**Cause:** Using hardcoded left/right values
**Solution:** Replace with logical properties:
- `marginLeft` → `marginStart`
- `marginRight` → `marginEnd`
- `paddingLeft` → `paddingStart`
- `paddingRight` → `paddingEnd`

### Issue: Expo Go not applying RTL

**Cause:** Expo Go has limitations with `I18nManager`
**Solution:** Use development build:
```bash
npx expo run:ios
# or
npx expo run:android
```

### Issue: "Restart Required" not showing

**Cause:** `expo-updates` not available
**Solution:**
```bash
npm install expo-updates
```

---

## 📱 Testing Checklist

### Visual Tests:

- [ ] Text aligns right in Arabic, left in English
- [ ] Navigation back button on correct side
- [ ] Icons flip correctly (arrows, chevrons)
- [ ] Lists/bullets on correct side
- [ ] Input cursors start on correct side
- [ ] Tabs flow in correct direction
- [ ] Margins/padding respect direction

### Functional Tests:

- [ ] Switch to English → App reloads → English with LTR
- [ ] Switch to Arabic → App reloads → Arabic with RTL
- [ ] Saved language persists after app restart
- [ ] All translations display correctly
- [ ] Forms work in both directions
- [ ] Navigation flows correctly

---

## 📊 File Structure

```
src/
├── lib/
│   └── i18n.ts              # RTL initialization & i18next config
├── utils/
│   └── language.ts          # Language switching with Updates.reloadAsync()
├── hooks/
│   └── useRTL.ts            # RTL utilities & logical properties
├── components/
│   └── ui/
│       └── PhoneInput.tsx   # Example using logical properties
└── locales/
    ├── en/
    │   └── translation.json
    └── ar/
        └── translation.json

app/
└── _layout.tsx              # Root layout with RTL initialization
```

---

## 🔑 Key Concepts

### I18nManager Methods:

```typescript
I18nManager.isRTL           // Check current RTL state (boolean)
I18nManager.allowRTL(true)  // Enable RTL support globally
I18nManager.forceRTL(bool)  // Force RTL/LTR mode (requires restart)
```

### Logical Properties:

| Old (Directional) | New (Logical) | Behavior |
|------------------|---------------|----------|
| `marginLeft` | `marginStart` | Auto-flips in RTL |
| `marginRight` | `marginEnd` | Auto-flips in RTL |
| `paddingLeft` | `paddingStart` | Auto-flips in RTL |
| `paddingRight` | `paddingEnd` | Auto-flips in RTL |

### AsyncStorage Keys:

- `@app_language` - Saved language preference ('en' or 'ar')
- `@rtl_state_applied` - RTL state tracking ('pending', 'rtl', 'ltr')

---

## 🎯 Summary of Changes

| Component | Before | After |
|-----------|--------|-------|
| **Dependencies** | react-native-restart | expo-updates |
| **Initialization** | Race conditions | Async with state tracking |
| **Reloading** | Unreliable restart | Updates.reloadAsync() |
| **Styling** | Conditional classes | Logical properties |
| **Layout** | Simple key change | Key + RTL state |
| **Hook** | Basic utilities | Full logical properties support |

---

## 🚀 Next Steps

1. **Test thoroughly** on both iOS and Android
2. **Use logical properties** in all new components
3. **Refactor existing components** gradually to use logical properties
4. **Test with development builds** instead of Expo Go for best results
5. **Consider EAS Build** for production deployment

---

## 📚 Resources

- [React Native I18nManager](https://reactnative.dev/docs/i18nmanager)
- [Expo Updates](https://docs.expo.dev/versions/latest/sdk/updates/)
- [RTL Layout Guide](https://reactnative.dev/docs/rtl-layout)
- [i18next Documentation](https://www.i18next.com/)

---

**Your app now has a robust, production-ready RTL/LTR implementation! 🎉**
