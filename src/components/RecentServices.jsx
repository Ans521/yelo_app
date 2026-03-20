import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListingCard from './ListingCard';

const GUEST_SIGN_IN_TITLE = 'Please sign in';
const GUEST_SIGN_IN_MESSAGE = 'Sign in to view business details, call or share.';

const FALLBACK_IMAGE = require('../assets/images/new.png');

function normalizeBusiness(b, index) {
  const id = String(b.id ?? b.business_id ?? index);
  const title = b.title ?? b.business_name ?? b.name ?? 'Business';
  const subtitle = b.subtitle ?? b.address ?? b.location ?? '';
  const phone_no = b.phone_no ?? '';
  const image = b.image_url
    ? { uri: b.image_url }
    : (Array.isArray(b.gallery) && b.gallery.length > 0)
      ? (b.gallery.find((g) => g.isMain) ?? b.gallery[0])?.url
        ? { uri: (b.gallery.find((g) => g.isMain) ?? b.gallery[0]).url }
        : FALLBACK_IMAGE
      : FALLBACK_IMAGE;
  return { id, title, subtitle, image, phone_no };
}

const DEFAULT_DATA = [
  { id: '1', title: 'Spice Garden Restaurant', subtitle: 'Sector 22, Chandigarh', image: require('../assets/images/new.png') },
  { id: '2', title: 'Hotel Royal Stay', subtitle: 'Zirakpur, Punjab', image: require('../assets/images/new1.png') },
  { id: '3', title: 'Urban Tandoor', subtitle: 'Phase 302, Mohali', image: require('../assets/images/homescreen.png') },
];

const MAX_ITEMS = 5;

export default function RecentServices({ businesses = [], isGuest, onSignInRequested }) {
  const navigation = useNavigation();
  const handleViewAll = () => {
    navigation.navigate('Category', {
      screen: 'SubcategoryList',
      params: { mode: 'recent', title: 'Recent Services' },
    });
  };
  const data = businesses.length > 0
    ? businesses.map(normalizeBusiness).slice(0, MAX_ITEMS)
    : DEFAULT_DATA.slice(0, MAX_ITEMS);

  const handleCardPress = (item) => {
    if (isGuest) {
      Alert.alert(GUEST_SIGN_IN_TITLE, GUEST_SIGN_IN_MESSAGE, [
        { text: 'OK' },
        { text: 'Sign in', onPress: () => onSignInRequested?.() },
      ]);
      return;
    }
    const businessId = item.id ?? item.business_id;
    navigation.navigate('AddListing', {
      screen: 'ListingDetail',
      params: { businessId },
    });
  };
  const renderItem = ({ item }) => (
    <ListingCard
      item={{
        image: item.image,
        title: item.title,
        subtitle: item.subtitle,
        phone_no: item.phone_no,
        shareUrl: item.shareUrl,
      }}
      onPress={() => handleCardPress(item)}
      requireSignIn={isGuest}
      onSignInRequested={onSignInRequested}
    />
  );
  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Services</Text>
        <TouchableOpacity onPress={handleViewAll} style={styles.arrowButton} activeOpacity={0.8}>
          <MaterialIcons name="arrow-forward" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        listKey="recent-services"
      />
    </View>
  );
}

const SECTION_GAP = 24;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: -45,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F08E14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 12,
    marginBottom: 16,
  },
});
