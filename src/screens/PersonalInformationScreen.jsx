import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import BackLogoHeader from '../components/common/BackLogoHeader';
import { getUserInfo, updateUserInfo } from '../services/authApi';

const ORANGE = '#F08E14';
const BORDER = '#E5E7EB';
const TEXT_DARK = '#111827';
const TEXT_LIGHT = '#6B7280';

export default function PersonalInformationScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await getUserInfo();
      if (cancelled) return;
      console.log("res", res)
      setLoading(false);
      if (res.success && res.data) {
        setFullName(res.data.name ?? '');
        setEmail(res.data.email ?? '');
        setPhone(res.data.phone_no != null ? String(res.data.phone_no) : '');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Missing information', 'Name, email and phone number cannot be empty.');
      return;
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      Alert.alert(
        'Invalid phone number',
        'Phone number must be exactly 10 digits.',
        [{ text: 'OK' }]
      );
      return;
    }
    const res = await updateUserInfo({
      name: fullName.trim(),
      email: email.trim(),
      phone_no: digitsOnly,
    });
    if (res.success) {
      Alert.alert('Saved', 'Your information has been updated.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Error', res.message || 'Failed to update information.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <BackLogoHeader />
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={ORANGE} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <BackLogoHeader />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Personal Information</Text>
          <View style={styles.separator} />

          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="person-outline" size={20} color={TEXT_LIGHT} style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={TEXT_LIGHT}
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
              />
              <MaterialIcons name="edit" size={20} color={TEXT_LIGHT} style={styles.inputIconRight} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="mail-outline" size={20} color={TEXT_LIGHT} style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={TEXT_LIGHT}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="phone-android" size={20} color={TEXT_LIGHT} style={styles.inputIcon} />
              <TextInput
                placeholder="Enter phone number"
                placeholderTextColor={TEXT_LIGHT}
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                inputMode="tel"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
            <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: BORDER,
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    backgroundColor: '#ffffff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: TEXT_DARK,
    paddingVertical: 0,
  },
  inputIconRight: {
    marginLeft: 8,
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: ORANGE,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
