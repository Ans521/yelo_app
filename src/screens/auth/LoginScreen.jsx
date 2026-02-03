import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const isValidPhone = value => /^[6-9]\d{9}$/.test(value);

  // ✅ Submit handler
  const handleSubmit = () => {
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!isValidPhone(phone)) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }

    setError('');
        navigation.navigate('Otp', {
      phone: phone,
    });
    // 👉 Firebase OTP / navigation here
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Background Container */}
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <ImageBackground
          source={require('../../assets/images/background_img.png')}
          className="flex-1"
          resizeMode="cover"
        >
          <View className="items-center pt-[60px]">
            <Image
              source={require('../../assets/images/logo.png')}
              className="w-60 h-60"
              resizeMode="contain"
            />
          </View>
        </ImageBackground>

        <View className="flex-1 bg-white" />
      </View>

      <LinearGradient
        colors={['#FFF9E6', '#FFEDED']}
        className="w-[240px] h-[280px] rounded-tl-[380px] absolute bottom-0 right-0 z-10"
      />

      <View
        className="absolute top-[32%] left-5 right-5 bg-white rounded-2xl p-6 z-20"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        <Text className="text-2xl font-extrabold pt-4 text-black mb-2 text-center tracking-wider">
          WELCOME BACK
        </Text>

        <Text className="text-sm text-[#666] mb-6 text-center">
          Sign in to your account
        </Text>

        {/* Email Input */}
        <View
          className={`flex-row items-center border rounded-sm px-3 h-[50px] bg-[#FAFAFA]
          ${error ? 'border-red-500' : 'border-[#E0E0E0]'}`}
        >
          <MaterialIcons name="phone-android" color="#777777" size={18} />
          <TextInput
            className="flex-1 text-sm text-black ml-2"
            placeholder="Enter Your Email / Phone Number "
            placeholderTextColor="#999"
            value={phone}
            onChangeText={text => {
              setPhone(text.replace(/[^0-9]/g, '')); 
              if (error) setError('');
            }}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {/* Error Message */}
        {error ? (
          <Text className="text-red-500 text-xs mt-1 mb-4">{error}</Text>
        ) : (
          <View className="mb-5" />
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className="rounded-md mb-4 overflow-hidden "onPress={handleSubmit}
        >
          <LinearGradient
            colors={['#FF9800', '#ef4444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="py-[15px] items-center"
          >
            <Text className="text-white text-base font-bold tracking-wide" >
              SUBMIT
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-[1px] bg-[#E0E0E0]" />
          <Text className="mx-3 text-[#999] text-xs">OR</Text>
          <View className="flex-1 h-[1px] bg-[#E0E0E0]" />
        </View>

        {/* Google Login */}
        <TouchableOpacity className="flex-row items-center justify-center border border-[#E0E0E0] rounded-md py-3 mb-3 bg-white">
          <FontAwesome name="google" color="blue" size={18} />
          <Text className="text-sm text-[#333] ml-2">Continue with Google</Text>
        </TouchableOpacity>

        {/* Guest Login */}
        <TouchableOpacity className="flex-row items-center justify-center border border-[#E0E0E0] rounded-md py-3 mb-4 bg-white">
          <FontAwesome name="user" color="#000" size={18} />
          <Text className="text-sm text-[#333] ml-2">Explore as a guest</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-xs text-[#666] text-center py-6">
            Terms and Conditions
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
