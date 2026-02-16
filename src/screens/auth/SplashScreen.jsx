import { View, Image } from 'react-native';
import { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
      <LinearGradient
        colors={['#FF9800', '#ef4444']}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          className="w-50 h-50"
          resizeMode="contain"
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
