import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isImageLoaded) {
      const timeout = setTimeout(() => {
        router.replace('/auth/login');
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isImageLoaded]);

  return (
    <View style={{ flex: 1, backgroundColor: '#F99043', alignItems: 'center', justifyContent: 'center' }}>
      <Image 
        source={require('../assets/splash.png')} 
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
        onLoadEnd={() => setIsImageLoaded(true)}
      />
    </View>
  );
}
