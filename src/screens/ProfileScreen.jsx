import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LogoHeader from '../components/common/LogoHeader';

const ORANGE = '#F08E14';
const TEXT_DARK = '#111827';

const PROFILE_ITEMS = [
  { id: '1', label: 'Personal Information', icon: 'person' },
  { id: '2', label: 'Edit Business Listing', icon: 'business' },
  { id: '3', label: 'About Us', icon: 'info-outline' },
  { id: '4', label: 'Delete Profile', icon: 'delete-outline' },
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

  const handlePress = (item) => {
    if (item.id === '1') {
      navigation.navigate('PersonalInformation');
    } else {
      console.log('Profile item:', item.label);
    }
  };

  return (
    <View style={styles.screen}>
      <LogoHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        {PROFILE_ITEMS.map((item) => (
          <ProfileRow key={item.id} item={item} onPress={handlePress} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 20,
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
});
