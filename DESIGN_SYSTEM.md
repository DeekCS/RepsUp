# Design System Documentation

## Theme Configuration

The RepsUp app follows a comprehensive design system based on DM Sans typography and a carefully curated color palette.

### Typography
- **Font Family**: DM Sans
- **Weights**: Regular, Medium, Bold
- **Sizes**: 12px - 36px

### Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Faded Orange | #FF8643 | Primary brand color, CTAs |
| Birch | #3D3D26 | Dark text, backgrounds |
| Dusty Grey | #A79D95 | Secondary text, borders |
| Vista White | #FEF3F6 | Light backgrounds |
| Chilli Pepper | #C81213 | Errors, alerts |
| Nobel | #B3B2B0 | Medium grey elements |
| Green White | #EAE8E4 | Off-white surfaces |

### Grid System

- **Columns**: 4 column stretch
- **Gutter**: 20px between columns
- **Margin**: 16px edge margins
- **Base Unit**: 4px for spacing

### Components

#### Grid Components
```tsx
import { Container, Row, Col, Spacer } from '@/components/ui';

// Container with 16px margins
<Container>
  <Row>
    <Col span={2}>Half width</Col>
    <Col span={2}>Half width</Col>
  </Row>
</Container>

// Spacer for consistent gaps
<Spacer size={4} /> // 16px vertical space
<Spacer size={6} horizontal /> // 24px horizontal space
```

#### Using Theme
```tsx
import { useTheme } from '@/contexts/ThemeContext';

const theme = useTheme();
// Access: theme.colors, theme.spacing, theme.grid, etc.
```

### Tailwind Classes

Use the design system colors in Tailwind:
- `bg-fadedOrange` - Primary orange
- `text-birch` - Dark text
- `bg-vistaWhite` - Light background
- `text-dustyGrey` - Secondary text
- `border-nobel` - Grey borders
