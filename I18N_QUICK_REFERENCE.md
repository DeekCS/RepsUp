# 🚀 i18n Quick Reference

Quick copy-paste snippets for using translations in your RepsUp app.

## 🎯 Basic Usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Text>{t('common.login')}</Text>
      <Text>{t('auth.login.title')}</Text>
    </View>
  );
}
```

## 🔄 With Interpolation (Dynamic Values)

```tsx
function GreetingComponent() {
  const { t } = useTranslation();
  const userName = "Ahmed";
  
  return <Text>{t('greeting', { name: userName })}</Text>;
}
```

Translation file:
```json
{
  "greeting": "Hello {{name}}!"
}
```

## 🌐 Change Language

```tsx
import { changeLanguage } from '@/src/utils/language';

const handleLanguageChange = async () => {
  await changeLanguage('ar'); // Switch to Arabic
  // await changeLanguage('en'); // Switch to English
};
```

## 📍 Get Current Language

```tsx
import { getCurrentLanguage, isRTL } from '@/src/utils/language';

const currentLang = getCurrentLanguage(); // Returns 'en' or 'ar'
const isArabic = isRTL(); // Returns true if Arabic
```

## 🎨 Language Switcher Component

```tsx
import { LanguageSwitcher } from '@/src/components/features/LanguageSwitcher';

// Dropdown style (recommended for settings)
<LanguageSwitcher variant="dropdown" />

// Inline style (for compact spaces)
<LanguageSwitcher variant="inline" />
```

## 💅 Conditional Styling

```tsx
import { useTranslation } from 'react-i18next';

function StyledComponent() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <Text 
      style={[
        styles.text,
        isArabic && styles.rtlText
      ]}
    >
      {t('message')}
    </Text>
  );
}
```

## 🔢 Pluralization

Translation file:
```json
{
  "item_one": "{{count}} item",
  "item_other": "{{count}} items"
}
```

Usage:
```tsx
<Text>{t('item', { count: 1 })}</Text> // "1 item"
<Text>{t('item', { count: 5 })}</Text> // "5 items"
```

## 📝 Multiple Interpolations

Translation:
```json
{
  "welcome_message": "Hello {{name}}, you have {{count}} new messages"
}
```

Usage:
```tsx
<Text>
  {t('welcome_message', { 
    name: 'Ahmed', 
    count: 5 
  })}
</Text>
```

## ➕ Adding New Translations

1. **Add to English** (`src/locales/en/translation.json`):
```json
{
  "myFeature": {
    "title": "My Feature",
    "description": "Feature description"
  }
}
```

2. **Add to Arabic** (`src/locales/ar/translation.json`):
```json
{
  "myFeature": {
    "title": "ميزتي",
    "description": "وصف الميزة"
  }
}
```

3. **Use in component**:
```tsx
const { t } = useTranslation();
<Text>{t('myFeature.title')}</Text>
```

## 📚 Available Translation Keys

### Common
- `t('common.login')` → "Login" / "تسجيل الدخول"
- `t('common.logout')` → "Logout" / "تسجيل الخروج"
- `t('common.save')` → "Save" / "حفظ"
- `t('common.cancel')` → "Cancel" / "إلغاء"
- `t('common.loading')` → "Loading..." / "جاري التحميل..."

### Auth
- `t('auth.login.title')` → "Welcome Back" / "مرحباً بعودتك"
- `t('auth.login.subtitle')` → Login subtitle text
- `t('auth.login.phonePlaceholder')` → "Enter your phone number"
- `t('auth.login.continueButton')` → "Continue" / "متابعة"

### Tabs
- `t('tabs.home')` → "Home" / "الرئيسية"
- `t('tabs.add')` → "Add Workout" / "إضافة تمرين"
- `t('tabs.history')` → "History" / "السجل"
- `t('tabs.progress')` → "Progress" / "التقدم"
- `t('tabs.profile')` → "Profile" / "الملف الشخصي"

### Workout
- `t('workout.title')` → "Workouts" / "التمارين"
- `t('workout.addNew')` → "Add New Workout"
- `t('workout.exercise')` → "Exercise" / "التمرين"
- `t('workout.sets')` → "Sets" / "مجموعات"
- `t('workout.reps')` → "Reps" / "تكرارات"
- `t('workout.weight')` → "Weight" / "الوزن"

### Profile
- `t('profile.settings')` → "Settings" / "الإعدادات"
- `t('profile.language')` → "Language" / "اللغة"
- `t('profile.theme')` → "Theme" / "المظهر"

### Settings
- `t('settings.changeLanguage')` → "Change Language" / "تغيير اللغة"
- `t('settings.english')` → "English" / "الإنجليزية"
- `t('settings.arabic')` → "Arabic" / "العربية"

## 🎯 TypeScript Type Safety

Thanks to `src/types/i18next.d.ts`, you get autocomplete for translation keys!

```tsx
t('auth.login.') // IDE will suggest: title, subtitle, phoneNumber, etc.
```

## 📖 More Resources

- **Full Guide**: [I18N_GUIDE.md](./I18N_GUIDE.md)
- **Setup Docs**: [TRANSLATION_SETUP.md](./TRANSLATION_SETUP.md)
- **Demo Screen**: `app/examples/i18n-demo.tsx`
- **Official Docs**: 
  - [i18next](https://www.i18next.com/)
  - [react-i18next](https://react.i18next.com/)

---

**Pro Tip**: Always use translation keys instead of hardcoded text for a truly international app! 🌍
