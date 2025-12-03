import { View, ViewProps } from 'react-native';

// Theme constants
const theme = {
  grid: {
    margin: 16,
    gutter: 20,
  },
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
  },
};

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container component with grid margins (16px)
 */
export const Container: React.FC<ContainerProps> = ({ children, className = '', style, ...props }) => {
  return (
    <View 
      className={`px-grid-margin ${className}`}
      style={[{ paddingHorizontal: theme.grid.margin }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

interface RowProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  gap?: boolean;
}

/**
 * Row component with gutters (20px)
 */
export const Row: React.FC<RowProps> = ({ children, className = '', gap = true, style, ...props }) => {
  return (
    <View 
      className={`flex-row ${className}`}
      style={[
        gap && { marginHorizontal: -theme.grid.gutter / 2 },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

interface ColProps extends ViewProps {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4;
  className?: string;
  gap?: boolean;
}

/**
 * Column component that spans 1-4 columns
 */
export const Col: React.FC<ColProps> = ({ children, span = 1, className = '', gap = true, style, ...props }) => {
  const flexValue = span;
  
  return (
    <View 
      className={className}
      style={[
        { flex: flexValue },
        gap && { paddingHorizontal: theme.grid.gutter / 2 },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
}

/**
 * Spacer component for consistent spacing
 */
export const Spacer: React.FC<SpacerProps> = ({ size = 4, horizontal = false }) => {
  const spacing = theme.spacing[size as keyof typeof theme.spacing] || theme.spacing[4];
  
  return (
    <View 
      style={horizontal ? { width: spacing } : { height: spacing }} 
    />
  );
};
