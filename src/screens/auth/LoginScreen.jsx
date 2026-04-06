import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import Geolocation from 'react-native-geolocation-service';
import { getOtp } from '../../services/authApi';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import { HOME_FEED_QUERY_KEY } from '../../hooks/useHomeFeed';

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || '').trim());

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { setTokens, setAuthenticated, loginAsGuest, location, setLocation, fcmToken } = useAuth();

  const requestLocationPermissionAndFetch = async () => {
    let coords = { latitude: null, longitude: null };
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message: 'We use your location to improve security and service experience.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('[Location] Permission denied, using null coords');
          setLocation(coords);
          return coords;
        }
      }
      // React Native: use react-native-geolocation-service (navigator.geolocation is undefined)
      await new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          (pos) => {
            coords = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            };
            console.log('[Location] Got position in LoginScreen', coords);
            setLocation(coords);
            resolve();
          },
          (err) => {
            console.warn('Location error:', err?.message);
            coords = { latitude: null, longitude: null };
            console.log('[Location] Error, setting null coords');
            setLocation(coords);
            resolve();
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
        );
      });
    } catch (e) {
      console.warn('Location permission error:', e?.message);
      coords = { latitude: null, longitude: null };
      console.log('[Location] Exception, setting null coords');
      setLocation(coords);
    }
    return coords;
  };

  // Ask for location once when the login screen (app entry) mounts
  useEffect(() => {
    requestLocationPermissionAndFetch();
  }, []);

  // Get OTP – ensure we try to fetch location first, but don't block if it fails.
  const handleSubmit = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Enter a valid email address');
      return;
    }

    setError('');

    // Try to get location before calling get-otp (non-blocking for errors)
    const coords = await requestLocationPermissionAndFetch();
    console.log('[Location] Using coords for getOtp', coords);
    setLoading(true);
    const result = await getOtp(email.trim(), coords, fcmToken);
    setLoading(false);
    if (result.success) {
      navigation.navigate('Otp', { email: email.trim() });
      if(result.data) {
        await setTokens(result.data.accessToken, result.data.refreshToken || null);
      }
    } else {
      setError(result.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleExploreAsGuest = () => {
    // Invalidate home feed so when Home mounts it will fetch (not use stale cache)
    queryClient.invalidateQueries({ queryKey: HOME_FEED_QUERY_KEY });
    loginAsGuest();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      {/* Background - behind safe area */}
      <View style={StyleSheet.absoluteFill}>
        <ImageBackground
          source={require('../../assets/images/background_img.png')}
          style={styles.bgImage}
          resizeMode="cover"
        >
          <View style={[styles.logoWrap, { paddingTop: 40 + insets.top }]}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
        <View style={styles.bgWhite} />
      </View>

      <LinearGradient
        colors={['#FFF9E6', '#FFEDED']}
        style={styles.gradient}
      />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 40 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>WELCOME BACK</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

            {/* Email Input - explicit zIndex so it never sits under gradient on iOS */}
            <View style={[styles.inputRow, error && styles.inputRowError]}>
              <MaterialIcons name="email" color="#777777" size={18} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <View style={styles.spacer} />
            )}

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.9}
            >
              <View style={styles.submitGradientWrap}>
                <LinearGradient
                  colors={['#FF9800', '#ef4444']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.submitText}>SUBMIT</Text>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialBtn}
              onPress={handleExploreAsGuest}
              activeOpacity={0.8}
            >
              <FontAwesome name="user" color="#000" size={18} />
              <Text style={styles.socialText}>Explore as a guest</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://mherpsol.com/privacy-policy/')}>
              <Text style={styles.terms}>Terms and Conditions Apply</Text>
            </TouchableOpacity>

            {/* <Text style={styles.apiUrl} numberOfLines={1}>
              API: {API_BASE_URL}
            </Text> */}
          </View> 
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  bgImage: { flex: 1 },
  bgWhite: { flex: 1, backgroundColor: '#fff' },
  logoWrap: { alignItems: 'center' },
  logo: { width: 240, height: 240 },
  gradient: {
    position: 'absolute',
    width: 240,
    height: 280,
    borderTopLeftRadius: 380,
    bottom: 0,
    right: 0,
  },
  keyboard: { flex: 1 },
  scroll: { flex: 1 },
  // Extra top padding so the card sits a bit lower on the screen
  scrollContent: { paddingHorizontal: 20, paddingTop: 230, paddingBottom: 40 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    minHeight: 380,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  title: { fontSize: 22, fontWeight: '800', color: '#000', marginBottom: 8, textAlign: 'center', letterSpacing: 1 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 24, textAlign: 'center' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#FAFAFA',
    zIndex: 1,
  },
  inputRowError: { borderColor: '#ef4444' },
  input: { flex: 1, fontSize: 14, color: '#000', marginLeft: 8, paddingVertical: 12 },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4, marginBottom: 16 },
  spacer: { height: 20 },
  submitBtn: { borderRadius: 8, marginBottom: 16, overflow: 'hidden', height: 50 },
  submitGradientWrap: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 8,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  dividerText: { marginHorizontal: 12, color: '#999', fontSize: 12 },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  socialText: { fontSize: 14, color: '#333', marginLeft: 8 },
  terms: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    paddingBottom: 8,
  },
  apiUrl: { fontSize: 10, color: '#999', textAlign: 'center', paddingBottom: 8 },
});
