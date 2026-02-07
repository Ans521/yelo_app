import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './src/navigation/AuthNavigator';
import { View } from 'react-native';
import { useColorScheme } from 'react-native';
export default function App() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
