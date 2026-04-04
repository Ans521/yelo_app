import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LogoHeader from '../components/common/LogoHeader';
import { useAuth } from '../context/AuthContext';
import { deleteProfile } from '../services/authApi';

const ORANGE = '#F08E14';
const TEXT_DARK = '#111827';
const TEXT_LIGHT = '#6B7280';

const GUEST_SIGN_IN_TITLE = 'Please sign in';
const GUEST_SIGN_IN_MESSAGE = 'Sign in or create an account to access your profile, manage your information and business listings.';

const PROFILE_ITEMS = [
  { id: '1', label: 'Personal Information', icon: 'person' },
  { id: '2', label: 'See business listing', icon: 'business' },
  { id: '4', label: 'Delete Profile', icon: 'delete-outline' },
  { id: 'logout', label: 'Logout', icon: 'logout' },
];

function ProfileRow({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <MaterialIcons name={item.icon} size={22} color={TEXT_DARK} style={styles.rowIcon} />
      <Text style={styles.rowLabel}>{item.label}</Text>
      <View style={styles.chevronWrap}>
        <MaterialIcons name="chevron-right" size={22} color="#ffffff" />
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { isGuest, logout } = useAuth();

  if (isGuest) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <LogoHeader />
        <View style={styles.guestWrap}>
          <View style={styles.guestCard}>
            <View style={styles.guestIconCircle}>
              <MaterialIcons name="person-outline" size={40} color={ORANGE} />
            </View>
            <Text style={styles.guestTitle}>{GUEST_SIGN_IN_TITLE}</Text>
            <Text style={styles.guestMessage}>{GUEST_SIGN_IN_MESSAGE}</Text>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => logout()}
              activeOpacity={0.8}
            >
              <MaterialIcons name="login" size={18} color="#ffffff" style={{marginRight: 8}} />
              <Text style={styles.guestButtonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handlePress = (item) => {
    if (item.id === '1') {
      navigation.navigate('PersonalInformation');
    } else if (item.id === '2') {
      navigation.navigate('MyBusinesses');
    } else if (item.id === '4') {
      Alert.alert(
        'Delete profile',
        'Are you sure you want to delete your profile? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              const res = await deleteProfile();
              if (res.success) {
                logout();
              } else {
                Alert.alert('Error', res.message || 'Failed to delete profile.');
              }
            },
          },
        ],
      );
    } else if (item.id === 'logout') {
      logout();
    } else {
      console.log('Profile item:', item.label);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
       <LogoHeader />
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        <View style={styles.rowStyle}>
          {PROFILE_ITEMS.map((item) => (
            <ProfileRow key={item.id} item={item} onPress={handlePress} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D26100',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    // paddingHorizontal: 16,
    // paddingTop: 24,
    paddingBottom: 100,
  },
  rowStyle: {
    // backgroundColor: ORANGE,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: TEXT_DARK,
  },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  guestCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  guestIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 10,
    textAlign: 'center',
  },
  guestMessage: {
    fontSize: 14,
    color: TEXT_LIGHT,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 21,
    paddingHorizontal: 8,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ORANGE,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
