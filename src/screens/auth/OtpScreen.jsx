import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { getOtp, verifyOtp } from '../../services/authApi';

const RESEND_COOLDOWN_SEC = 45;

export default function OtpScreen({ navigation }) {
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
    <SafeAreaView className="flex-1" edges={['top', 'left', 'right', 'bottom']}>
      {/* Background Container */}
      <View className="absolute top-0 left-0 right-0 bottom-0">
        {/* Top background image */}
        <ImageBackground
          source={require('../../assets/images/background_img.png')}
          className="flex-1"
          resizeMode="cover"
        >
          <View className="ml-[20px] pt-[60px]">
            <TouchableOpacity
              className="mb-4"
              onPress={() => navigation?.goBack()}
            >
              <View className="w-8 h-8 rounded-full bg-white items-center justify-center">
                <Ionicons
                  name="chevron-back-outline"
                  color="#000"
                  size={18}
                />
              </View>
            </TouchableOpacity>

            <Text className="text-white text-3xl font-bold mb-2 pt-[30px]">
              ENTER OTP CODE
            </Text>

            <Text className="text-white text-sm opacity-90">
              Enter the 4-digit OTP
            </Text>
          </View>
        </ImageBackground>

        {/* Bottom white section */}
        <View className="flex-1 bg-white" />
      </View>

      {/* Curved gradient shape */}
      <LinearGradient
        colors={['#FFF9E6', '#FFEDED']}
        className="w-[240px] h-[280px] rounded-tl-[380px] absolute bottom-0 right-0 z-10"
      />

      {/* Floating OTP Card */}
      <View
        className="absolute top-[36%] left-5 right-5 bg-white rounded-2xl p-6 z-20"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        {/* Header */}
        <Text className="text-2xl  font-extrabold mt-8  text-black mb-2 text-center tracking-wider">
          VERIFICATION
        </Text>

        <Text className="text-sm text-[#666] mb-2 text-center">
          A verification code has been sent to{'\n'}
          {email || 'your email'}
        </Text>

        {error ? (
          <Text className="text-red-500 text-xs text-center mb-2">{error}</Text>
        ) : null}

        {/* OTP Input Boxes */}
        <View className="flex-row justify-center mb-6 gap-3">
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className="w-14 h-14 border-2 border-[#E0E0E0] rounded-lg text-center text-2xl font-bold text-black bg-white"
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          className="rounded-md mb-4 overflow-hidden"
          onPress={handleVerify}
          disabled={loading}
        >
          <LinearGradient
            colors={['#FF9800', '#FF5722']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="py-4 items-center"
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-base font-semibold tracking-wide">
                VERIFY & CONTINUE
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Didn't receive code & Resend links */}
        <View className="flex-row justify-center items-center mb-2">
          <Text className="text-[#999] text-sm">
            Didn't receive code?{' '}
          </Text>
          <TouchableOpacity
            onPress={handleResend}
            disabled={resendTimer > 0 || loading}
          >
            <Text
              className={`text-sm font-semibold ${resendTimer > 0 ? 'text-[#999]' : 'text-[#FF5722]'}`}
            >
              {resendTimer > 0 ? `Resend in 00:${String(resendTimer).padStart(2, '0')}` : 'Resend'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resend OTP Timer */}
        <Text className="text-center text-[#999] pb-8 text-sm">
          {resendTimer > 0
            ? `Resend OTP in 00:${String(resendTimer).padStart(2, '0')}`
            : 'You can request a new code above'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
