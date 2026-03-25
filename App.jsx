import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme, View, Button, Alert, Platform, PermissionsAndroid } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import messaging from '@react-native-firebase/messaging';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});


export async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission denied', 'Notification permission was not granted');
      return false;
    }
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}

export async function getFcmToken() {
  try {
    const hasPermission = await requestUserPermission();

    if (!hasPermission) {
      return 'simulator-no-token';
    }

    const token = await messaging().getToken();
    console.log('FCM TOKEN:', token);
    return token || 'simulator-no-token';
  } catch (error) {
    console.warn('getFcmToken error:', error?.message);
    return 'simulator-no-token';
  }
}


export default function App() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  // const {setFcmToken} = useAuth();
  // useEffect(() => {
  //     const token = getFcmToken()
  // }, [])
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor }}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavigationContainer>
              <AuthNavigator />
            </NavigationContainer>
          </AuthProvider>
        </QueryClientProvider>
      </View>
    </SafeAreaProvider>
  );
}
