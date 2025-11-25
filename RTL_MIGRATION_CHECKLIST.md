# 🔄 RTL Migration Checklist

## Quick Migration Guide for Existing Components

Use this checklist to update your existing components to support RTL properly.

---

## 🎯 Component Migration Steps

### 1. Import useRTL Hook

```tsx
import { useRTL } from '@/src/hooks';
```

### 2. Replace Hardcoded Styles

#### Margins

```tsx
// ❌ Before
<View style={{ marginLeft: 10, marginRight: 20 }}>

// ✅ After
const { getLogicalMargin } = useRTL();
<View style={getLogicalMargin({ start: 10, end: 20 })}>
```

Or using StyleSheet:

```tsx
// ✅ StyleSheet approach
const styles = StyleSheet.create({
  container: {
    marginStart: 10,
    marginEnd: 20,
  }
});
```

#### Padding

```tsx
// ❌ Before
<View style={{ paddingLeft: 16, paddingRight: 16 }}>

// ✅ After
const { getLogicalPadding } = useRTL();
<View style={getLogicalPadding({ horizontal: 16 })}>
```

Or using StyleSheet:

```tsx
// ✅ StyleSheet approach
const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
  }
});
```

#### Text Alignment

```tsx
// ❌ Before
<Text style={{ textAlign: 'left' }}>

// ✅ After
const { getTextAlign } = useRTL();
<Text style={getTextAlign('auto')}>
```

#### Flex Direction

```tsx
// ❌ Before
<View style={{ flexDirection: 'row' }}>

// ✅ After - If you need it to flip
const { getFlexDirection } = useRTL();
<View style={getFlexDirection()}>

// ✅ Better - Usually flexDirection: 'row' works fine with RTL
// Only use getFlexDirection if you need special behavior
<View style={{ flexDirection: 'row' }}>
```

#### Absolute Positioning

```tsx
// ❌ Before
<View style={{ position: 'absolute', left: 10 }}>

// ✅ After
const { getLogicalPosition } = useRTL();
<View style={[{ position: 'absolute' }, getLogicalPosition({ start: 10 })]}>
```

#### Directional Icons

```tsx
// ❌ Before
<Image source={backArrow} />

// ✅ After
const { getFlipTransform } = useRTL();
<Image source={backArrow} style={getFlipTransform()} />
```

---

## 📋 Component Audit Checklist

Go through each component and check:

### Text Components
- [ ] All `<Text>` components have proper writing direction
- [ ] Text alignment is logical (not hardcoded left/right)
- [ ] Line height is consistent in both directions

### Layout Components
- [ ] No hardcoded `marginLeft`/`marginRight`
- [ ] No hardcoded `paddingLeft`/`paddingRight`
- [ ] Flex containers work in both directions
- [ ] Spacing is consistent in both RTL and LTR

### Form Components
- [ ] Input fields align properly
- [ ] Labels positioned correctly
- [ ] Error messages aligned
- [ ] Placeholder text flows correctly

### Icons & Images
- [ ] Directional icons flip in RTL (arrows, chevrons)
- [ ] Non-directional icons stay the same
- [ ] Image positioning respects direction

### Navigation
- [ ] Back buttons on correct side
- [ ] Tab bars flow correctly
- [ ] Drawer opens from correct side
- [ ] Breadcrumbs flow correctly

### Lists
- [ ] List items align properly
- [ ] Bullets/numbers on correct side
- [ ] Swipe actions work correctly
- [ ] Separators positioned correctly

---

## 🔍 Files to Review

Based on your project structure, prioritize these files:

### High Priority
- [ ] `app/auth/login.tsx` - Login screen
- [ ] `app/auth/verify-otp.tsx` - OTP verification
- [ ] `app/tabs/_layout.tsx` - Tab navigation
- [ ] `app/tabs/index.tsx` - Home tab
- [ ] `app/tabs/profile.tsx` - Profile tab

### UI Components
- [ ] `src/components/ui/Button.tsx` ✅ (Already good)
- [ ] `src/components/ui/PhoneInput.tsx` ✅ (Already fixed)
- [ ] `src/components/ui/Card.tsx`
- [ ] `src/components/ui/SocialButton.tsx`
- [ ] `src/components/ui/Toggle.tsx`

### Feature Components
- [ ] `src/components/features/LanguageSwitcher.tsx` ✅ (Already good)

---

## 🛠️ Quick Fixes

### Common Pattern Replacements

#### Pattern 1: Conditional Margin Classes
```tsx
// ❌ Before
className={`${isRTL ? 'ml-4' : 'mr-4'}`}

// ✅ After - Use StyleSheet
style={{ marginStart: 16 }}
```

#### Pattern 2: Inline Styles
```tsx
// ❌ Before
style={{ marginLeft: 10, paddingRight: 20 }}

// ✅ After
style={{ marginStart: 10, paddingEnd: 20 }}
```

#### Pattern 3: Conditional Positioning
```tsx
// ❌ Before
style={{ position: 'absolute', [isRTL ? 'right' : 'left']: 10 }}

// ✅ After
const { getLogicalPosition } = useRTL();
style={[{ position: 'absolute' }, getLogicalPosition({ start: 10 })]}
```

---

## ✅ Testing Each Component

After migrating a component, test:

1. **Switch to Arabic**
   - Does text align right?
   - Are margins/padding correct?
   - Do icons flip properly?

2. **Switch to English**
   - Does text align left?
   - Are margins/padding correct?
   - Do icons face correct direction?

3. **Interaction**
   - Do buttons work?
   - Do inputs accept text correctly?
   - Does navigation flow correctly?

---

## 📝 Code Review Checklist

Before committing changes:

- [ ] No `marginLeft` or `marginRight` in styles
- [ ] No `paddingLeft` or `paddingRight` in styles
- [ ] No hardcoded `textAlign: 'left'` or `'right'`
- [ ] Directional icons use `getFlipTransform()`
- [ ] Text components have `writingDirection` set
- [ ] Tested in both Arabic and English
- [ ] No layout breaks when switching languages

---

## 🎨 TailwindCSS → StyleSheet Migration

If using TailwindCSS classes that don't support RTL:

```tsx
// ❌ Before (Tailwind)
className="ml-4 mr-2"

// ✅ After (StyleSheet)
const styles = StyleSheet.create({
  container: {
    marginStart: 16,  // ml-4 = 4 * 4 = 16
    marginEnd: 8,     // mr-2 = 2 * 4 = 8
  }
});
```

Note: NativeWind v4 may support RTL, but logical properties in StyleSheet are more reliable.

---

## 🚀 Progressive Migration Strategy

Don't try to fix everything at once:

### Phase 1: Core Screens (Week 1)
- Authentication screens
- Main navigation
- Profile screen

### Phase 2: Main Features (Week 2)
- Workout screens
- History screens
- Progress tracking

### Phase 3: Details (Week 3)
- Settings
- About
- Help screens

### Phase 4: Polish (Week 4)
- Animations
- Transitions
- Edge cases

---

## 🐛 Common Issues & Solutions

### Issue: Text overlapping in RTL

**Cause:** Fixed widths not accounting for RTL
**Solution:** Use `flex: 1` instead of fixed widths

### Issue: Icons not flipping

**Cause:** Forgot to use `getFlipTransform()`
**Solution:** Add transform to icon styles

### Issue: Input text at wrong end

**Cause:** Missing `textAlign` or `writingDirection`
**Solution:** Use `getTextAlign('auto')`

### Issue: Buttons aligned wrong

**Cause:** Using `justifyContent: 'flex-start'`
**Solution:** Use `'flex-end'` or center alignment

---

## 📊 Progress Tracking

Use this to track your migration progress:

```
Total Components: ___
Migrated: ___
Tested: ___
Complete: ___%
```

---

## 🎉 You're Done When...

- [ ] All screens work in both languages
- [ ] No console warnings about RTL
- [ ] Language switching is smooth
- [ ] All text aligns correctly
- [ ] All layouts flow properly
- [ ] All icons face correct direction
- [ ] All forms work in both directions
- [ ] Navigation is intuitive in both languages

---

**Good luck with the migration! Take it one component at a time. 🚀**
