import { Pressable, Text, ActivityIndicator } from 'react-native';
import { ComponentProps } from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: 'default' | 'full' | 'lg' | '3xl';
  className?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  rounded = 'full',
  className = '',
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-fadedOrange active:bg-fadedOrange/90',
    secondary: 'bg-birch active:bg-birch/90',
    outline: 'bg-transparent border-2 border-fadedOrange active:bg-fadedOrange/10',
    ghost: 'bg-transparent active:bg-gray-100',
  };

  const sizeStyles = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
    xl: 'px-10 py-4',
  };

  const textVariantStyles = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-fadedOrange',
    ghost: 'text-fadedOrange',
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-lg',
  };

  const roundedStyles = {
    default: 'rounded-xl',
    full: 'rounded-full',
    lg: 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`${roundedStyles[rounded]} items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${
        fullWidth ? 'w-full' : ''
      } ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#FF8643' : '#FFFFFF'} />
      ) : (
        <Text className={`font-semibold ${textVariantStyles[variant]} ${textSizeStyles[size]}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
