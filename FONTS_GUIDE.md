# Font Usage Guide

## ✅ Fonts are now set up!

The Inter font family is installed and configured. Here's how to use it:

### In React Native Components

```tsx
import { Text } from 'react-native';

// Use fontFamily in style prop
<Text style={{ fontFamily: 'Inter_400Regular' }}>Regular text</Text>
<Text style={{ fontFamily: 'Inter_500Medium' }}>Medium text</Text>
<Text style={{ fontFamily: 'Inter_600SemiBold' }}>Semi-bold text</Text>
<Text style={{ fontFamily: 'Inter_700Bold' }}>Bold text</Text>
```

### With NativeWind/Tailwind

Unfortunately, NativeWind doesn't directly support custom font families via className. You need to use style prop:

```tsx
<Text className="text-lg text-gray-900" style={{ fontFamily: 'Inter_600SemiBold' }}>
  Heading
</Text>
```

### Available Font Weights

- `Inter_400Regular` - Normal/Regular (400)
- `Inter_500Medium` - Medium (500)  
- `Inter_600SemiBold` - Semi-bold (600)
- `Inter_700Bold` - Bold (700)

### Global Configuration

The fonts are loaded in `app/_layout.tsx` and applied to:
- Tab bar labels
- Header titles
- Ready to use anywhere in the app

### Adding More Font Weights

If you need more weights, install them:

```bash
# The package includes these weights:
# Inter_100Thin, Inter_200ExtraLight, Inter_300Light, 
# Inter_400Regular, Inter_500Medium, Inter_600SemiBold, 
# Inter_700Bold, Inter_800ExtraBold, Inter_900Black
```

Then import and load them in `_layout.tsx`:

```tsx
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold, // Add this
} from '@expo-google-fonts/inter';
```
