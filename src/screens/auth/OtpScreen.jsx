import React, { useState, useRef, useEffect } from 'react';
import {
  View,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { getOtp, verifyOtp } from '../../services/authApi';

const RESEND_COOLDOWN_SEC = 45;

export default function OtpScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const email = route.params?.email || '';
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);

  // Start resend cooldown when screen mounts (OTP was just sent from Login)
  useEffect(() => {
    setResendTimer(RESEND_COOLDOWN_SEC);
  }, []);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError('');
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpString = otp.join('');

  const handleVerify = async () => {
    if (otpString.length !== 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }
    setError('');
    setLoading(true); 
    const result = await verifyOtp(email, otpString);
    console.log('result', result);
    setLoading(false);
    if (result.success) {
      navigation?.replace('Home');
    } else {
      setError(result.message || 'Please provide the correct OTP');
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || !email) return;
    setError('');
    setLoading(true);
    const result = await getOtp(email);
    setLoading(false);
    if (result.success) {
      setResendTimer(RESEND_COOLDOWN_SEC);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } else {
      setError(result.message || 'Failed to resend OTP.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={StyleSheet.absoluteFill}>
        <ImageBackground
          source={require('../../assets/images/background_img.png')}
          style={styles.bgImage}
          resizeMode="cover"
        >
          <View style={[styles.topSection, { paddingTop: 40 + insets.top }]}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
              <View style={styles.backCircle}>
                <Ionicons name="chevron-back-outline" color="#000" size={18} />
              </View>
            </TouchableOpacity>
            <Text style={styles.otpTitle}>ENTER OTP CODE</Text>
            <Text style={styles.otpSubtitle}>Enter the 4-digit OTP</Text>
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
            <Text style={styles.cardTitle}>VERIFICATION</Text>
            <Text style={styles.cardSubtitle}>
              A verification code has been sent to{'\n'}
              {email || 'your email'}
            </Text>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <View style={styles.otpRow}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[index]}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.verifyBtn}
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.9}
            >
              <View style={styles.verifyGradientWrap}>
                <LinearGradient
                  colors={['#FF9800', '#FF5722']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.verifyText}>VERIFY & CONTINUE</Text>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.resendRow}>
              <Text style={styles.resendLabel}>Didn't receive code? </Text>
              <TouchableOpacity
                onPress={handleResend}
                disabled={resendTimer > 0 || loading}
              >
                <Text style={[styles.resendLink, resendTimer > 0 && styles.resendDisabled]}>
                  {resendTimer > 0 ? `Resend in 00:${String(resendTimer).padStart(2, '0')}` : 'Resend'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.resendHint}>
              {resendTimer > 0
                ? `Resend OTP in 00:${String(resendTimer).padStart(2, '0')}`
                : 'You can request a new code above'}
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
  topSection: { marginLeft: 20 },
  backBtn: { marginBottom: 16 },
  backCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  otpTitle: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 8, paddingTop: 30 },
  otpSubtitle: { color: '#fff', fontSize: 14, opacity: 0.9 },
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 80 },
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
  cardTitle: { fontSize: 22, fontWeight: '800', color: '#000', marginTop: 16, marginBottom: 8, textAlign: 'center', letterSpacing: 1 },
  cardSubtitle: { fontSize: 14, color: '#666', marginBottom: 8, textAlign: 'center' },
  errorText: { color: '#ef4444', fontSize: 12, textAlign: 'center', marginBottom: 8 },
  otpRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    backgroundColor: '#fff',
    marginHorizontal: 6,
  },
  verifyBtn: { borderRadius: 8, marginBottom: 16, overflow: 'hidden', height: 52 },
  verifyGradientWrap: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 8,
  },
  verifyText: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 0.5 },
  resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  resendLabel: { color: '#999', fontSize: 14 },
  resendLink: { fontSize: 14, fontWeight: '600', color: '#FF5722' },
  resendDisabled: { color: '#999' },
  resendHint: { textAlign: 'center', color: '#999', paddingBottom: 32, fontSize: 14 },
});
