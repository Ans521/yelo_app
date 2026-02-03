import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1">
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

        <Text className="text-sm text-[#666] mb-8 text-center">
          A verification code has been sent to{'\n'}john@example.com
        </Text>

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
          onPress={() => navigation?.replace('Home')}
        >
          <LinearGradient
            colors={['#FF9800', '#FF5722']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="py-4 items-center"
          >
            <Text className="text-white text-base font-semibold tracking-wide">
              VERIFY & CONTINUE
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Didn't receive code & Resend links */}
        <View className="flex-row justify-center items-center mb-6">
          <Text className="text-[#999] text-sm">
            Didn't receive code?{' '}
          </Text>
          <TouchableOpacity>
            <Text className="text-[#FF5722] text-sm font-semibold">
              Resend
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resend OTP Timer */}
        <Text className="text-center text-[#999] pb-8 text-sm">
          Resend OTP in 00:45
        </Text>
      </View>
    </SafeAreaView>
  );
}
