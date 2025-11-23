import { Pressable, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { ComponentProps } from 'react';

type SocialProvider = 'google' | 'facebook';

interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function SocialButton({
  provider,
  onPress,
  loading = false,
  disabled = false,
  className = '',
}: SocialButtonProps) {
  const getIcon = () => {
    switch (provider) {
      case 'google':
        return (
          <Image
            source={require('../../../assets/icons/google.png')}
            style={{ width: 28, height: 28 }}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        );
      case 'facebook':
        return (
          <Image
            source={require('../../../assets/icons/facebook.png')}
            style={{ width: 28, height: 28 }}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        );
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`w-14 h-14 rounded-full bg-white items-center justify-center active:opacity-80 ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#FF8643" />
      ) : (
        getIcon()
      )}
    </Pressable>
  );
}
