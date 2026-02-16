import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getOtp } from '../../services/authApi';
import { API_BASE_URL } from '../../config/api';

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || '').trim());

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Get OTP via API (backend sends OTP to this email), then navigate to OTP screen
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
    setLoading(true);
    const result = await getOtp(email.trim());
    setLoading(false);
    console.log('result', result)
    if (result.success) {
      navigation.navigate('Otp', { email: email.trim() });
    } else {
      setError(result.message || 'Failed to send OTP. Please try again.');
    }
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

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialBtn}>
              <FontAwesome name="google" color="blue" size={18} />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn}>
              <FontAwesome name="user" color="#000" size={18} />
              <Text style={styles.socialText}>Explore as a guest</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.terms}>Terms and Conditions</Text>
            </TouchableOpacity>

            <Text style={styles.apiUrl} numberOfLines={1}>
              API: {API_BASE_URL}
            </Text>
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
    zIndex: 10,
  },
  keyboard: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 100 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
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
  terms: { fontSize: 12, color: '#666', textAlign: 'center', paddingVertical: 24 },
  apiUrl: { fontSize: 10, color: '#999', textAlign: 'center', paddingBottom: 8 },
});
