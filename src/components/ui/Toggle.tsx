import { Pressable, View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  value,
  onValueChange,
  disabled = false,
  className = '',
}: ToggleProps) {
  const translateX = useRef(new Animated.Value(value ? 24 : 2)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 24 : 2,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();
  }, [value]);

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`w-14 h-8 rounded-full justify-center ${
        value ? 'bg-fadedOrange' : 'bg-nobel'
      } ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <Animated.View
        className="w-6 h-6 rounded-full bg-white shadow-md"
        style={{
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
}
