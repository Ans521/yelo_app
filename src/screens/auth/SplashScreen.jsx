import { View, Image } from 'react-native';
import { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FF9800', '#ef4444']} 
      className="flex-1 items-center justify-center"
    >
      <Image
        source={require('../../assets/images/logo.png')}
        className="w-50 h-50"
        resizeMode="contain"
      />
    </LinearGradient>
  );
}
