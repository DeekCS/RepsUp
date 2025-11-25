# 🌐 RTL (Right-to-Left) Setup - Arabic Language

## ✅ What's Configured

Your app is now fully configured for **Arabic as the default language** with complete **RTL layout support**.

## 🎯 Key Changes Made

### 1. **Default Language Set to Arabic**
- App now starts in Arabic by default
- Fallback language changed from English to Arabic
- All UI elements will display in Arabic on first launch

### 2. **RTL Layout Enabled Globally**
- `I18nManager.allowRTL(true)` - Allows RTL layout
- `I18nManager.forceRTL(true)` - Forces RTL layout
- Entire app layout flows from right to left

### 3. **Dynamic RTL Switching**
- When switching between English and Arabic
- RTL layout automatically updates
- User gets notification to restart app for full effect

## 📁 Modified Files

1. **`src/lib/i18n.ts`**
   - Default language: `lng: 'ar'`
   - Fallback language: `fallbackLng: 'ar'`
   - RTL initialization on app start

2. **`app/_layout.tsx`**
   - Global RTL enabled: `I18nManager.forceRTL(true)`
   - Applied at app root level

3. **`src/utils/language.ts`**
   - Enhanced `changeLanguage()` function
   - Automatic RTL switching
   - User notification for restart

## 🚀 How It Works

### On App Start:
```
1. App loads → Default language: Arabic
2. I18nManager enables RTL layout
3. All text flows right-to-left
4. UI elements mirror (back button on right, etc.)
```

### When Switching Languages:
```typescript
// Switch to English (LTR)
await changeLanguage('en');
// → Alert shown to restart app
// → After restart: LTR layout applied

// Switch back to Arabic (RTL)
await changeLanguage('ar');
// → Alert shown to restart app
// → After restart: RTL layout applied
```

## 🎨 RTL Visual Changes

### What Changes in RTL Mode:

✅ **Text Direction**: Right-to-left reading  
✅ **Layout Mirroring**: UI elements flip horizontally  
✅ **Navigation**: Back buttons appear on right  
✅ **Icons**: Directional icons flip (arrows, etc.)  
✅ **Flexbox**: `flex-start` becomes right, `flex-end` becomes left  
✅ **Text Alignment**: Default right alignment  
✅ **Padding/Margin**: Left/right values swap  

### Example:
```
LTR (English):          RTL (Arabic):
┌─────────────┐        ┌─────────────┐
│ [←] Title   │        │   Title [→] │
│             │        │             │
│ Text here   │        │   كلمات هنا │
│   • Item 1  │        │  البند ١ •  │
│   • Item 2  │        │  البند ٢ •  │
└─────────────┘        └─────────────┘
```

## 🔧 Technical Details

### I18nManager Methods:
```typescript
I18nManager.isRTL          // Check if RTL is enabled
I18nManager.allowRTL(bool) // Allow RTL layout
I18nManager.forceRTL(bool) // Force RTL layout
```

### Language Utils:
```typescript
getCurrentLanguage()  // Returns: 'ar' or 'en'
isRTL()              // Returns: true (Arabic) or false (English)
changeLanguage('ar') // Switch to Arabic with RTL
changeLanguage('en') // Switch to English with LTR
```

## 📱 User Experience

### First Launch:
- ✅ App opens in Arabic
- ✅ All text in Arabic
- ✅ Layout flows right-to-left
- ✅ Natural experience for Arabic speakers

### Language Switching:
1. User selects language in settings
2. Alert appears: "إعادة تشغيل مطلوبة" / "Restart Required"
3. User confirms
4. App needs manual restart for full RTL effect
5. After restart: New language + layout active

## 🎯 Testing RTL Layout

### Visual Checks:
1. **Text Direction**: Arabic text reads right-to-left
2. **Navigation**: Back button on right side
3. **Lists**: Bullets/numbers on right
4. **Input Fields**: Cursor starts on right
5. **Icons**: Directional icons flipped

### Code Example:
```tsx
import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;
  
  return (
    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
      <Text>{t('welcome')}</Text> {/* "مرحباً بك في رابس آب" */}
    </View>
  );
}
```

## ⚠️ Important Notes

### Restart Required:
- Full RTL effect requires app restart
- This is a React Native limitation
- Alert notifies users automatically

### Platform Differences:
- **iOS**: Full RTL support
- **Android**: Full RTL support
- **Web**: Partial RTL support (uses CSS)

### CSS with RTL:
```css
/* Automatically flips in RTL */
.container {
  padding-left: 20px;  /* Becomes padding-right in RTL */
  margin-right: 10px;  /* Becomes margin-left in RTL */
}
```

## 🛠️ Troubleshooting

### Issue: RTL not applying
**Solution**: Close and restart the app completely

### Issue: Some elements not mirroring
**Solution**: Use `I18nManager.isRTL` for conditional styling:
```tsx
style={{
  paddingLeft: I18nManager.isRTL ? 0 : 20,
  paddingRight: I18nManager.isRTL ? 20 : 0,
}}
```

### Issue: Icons facing wrong direction
**Solution**: Conditionally transform:
```tsx
style={{
  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
}}
```

## 📊 Current State

```
✅ Default Language: Arabic (ar)
✅ RTL Layout: Enabled Globally
✅ Dynamic Switching: Supported
✅ User Notifications: Implemented
✅ TypeScript Support: Full
✅ Documentation: Complete
```

## 🔄 Migration from English Default

If you want to switch back to English as default:

1. Edit `src/lib/i18n.ts`:
   ```typescript
   lng: 'en', // Change from 'ar' to 'en'
   fallbackLng: 'en', // Change from 'ar' to 'en'
   ```

2. Edit `app/_layout.tsx`:
   ```typescript
   I18nManager.forceRTL(false); // Change true to false
   ```

3. Restart the app

## 📚 Resources

- [React Native I18nManager Docs](https://reactnative.dev/docs/i18nmanager)
- [RTL Layout Guide](https://reactnative.dev/docs/rtl-layout)
- [i18next RTL Support](https://www.i18next.com/)

---

**Your app is now fully RTL-ready with Arabic as the default language! 🇸🇦✨**
