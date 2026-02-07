import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackLogoHeader from '../components/common/BackLogoHeader';

const TEXT_DARK = '#111827';
const TEXT_LIGHT = '#6B7280';
const BORDER = '#E5E7EB';

// Same image pattern as HorizontalCategories: new, new1, homescreen, background_img in rotation
const LIST_IMAGE_0 = require('../assets/images/new.png');
const LIST_IMAGE_1 = require('../assets/images/new1.png');
const LIST_IMAGE_2 = require('../assets/images/homescreen.png');
const LIST_IMAGE_3 = require('../assets/images/background_img.png');

const DUMMY_NAMES = [
  'Spice Garden Restaurant',
  'Hotel Royal Stay',
  'Urban Tandoor',
  'Cafe Morning Brew',
  'Green Valley Resort',
  'Punjab Dhaba',
  'Royal Treat Restaurant',
  'City Bites',
  'The Food Court',
  'Kitchen Express',
  'Spice Route',
  'Dining Hub',
  'Flavors of India',
  'Quick Bite Cafe',
  'Grand Kitchen',
  'Taste of Punjab',
  'Metro Diner',
  'Sunrise Restaurant',
  'Downtown Eats',
  'Heritage Kitchen',
];

const DUMMY_LOCATIONS = [
  'Sector 22, Chandigarh',
  'Zirakpur, Punjab',
  'Phase 3B2, Mohali',
  'Sector 35, Chandigarh',
  'Morni Hills',
  'Panchkula',
  'Sector 17, Chandigarh',
  'Phase 10, Mohali',
  'Ambala Cantt',
  'Kalka',
  'Sector 42, Chandigarh',
  'Industrial Area, Mohali',
  'Manimajra, Chandigarh',
  'Derabassi',
  'Kharar',
  'Sector 8, Panchkula',
  'Phase 1, Mohali',
  'Sector 20, Chandigarh',
  'Baddi',
  'Naya Nangal',
];

function getListImage(index) {
  const imgs = [LIST_IMAGE_0, LIST_IMAGE_1, LIST_IMAGE_2, LIST_IMAGE_3];
  return imgs[index % 4];
}

function buildDummyList(size = 20) {
  return Array.from({ length: size }, (_, i) => ({
    id: String(i + 1),
    name: DUMMY_NAMES[i % DUMMY_NAMES.length],
    location: DUMMY_LOCATIONS[i % DUMMY_LOCATIONS.length],
    image: getListImage(i),
  }));
}

const SUBCATEGORY_LIST = buildDummyList(20);

function ListingCard({ item, onPress }) {
  const handleCall = (e) => {
    e?.stopPropagation?.();
    Linking.openURL('tel:+911234567890');
  };
  const handleWhatsApp = (e) => {
    e?.stopPropagation?.();
    Linking.openURL('https://wa.me/911234567890');
  };
  const handleShare = (e) => {
    e?.stopPropagation?.();
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {item.location}
        </Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={handleCall} style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialIcons name="call" size={20} color={TEXT_LIGHT} />
          </TouchableOpacity>
          <View style={styles.iconDivider} />
          <TouchableOpacity onPress={handleWhatsApp} style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="whatsapp" size={20} color={TEXT_LIGHT} />
          </TouchableOpacity>
          <View style={styles.iconDivider} />
          <TouchableOpacity onPress={handleShare} style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialIcons name="share" size={20} color={TEXT_LIGHT} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function SubcategoryListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const categoryName = route.params?.categoryName ?? 'Category';
  const subcategoryName = route.params?.subcategoryName ?? '';

  const handleCardPress = () => {
    navigation.navigate('AddListing', { screen: 'ListingDetail' });
  };

  return (
    <View style={styles.screen}>
      <BackLogoHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.categoryName}>
          {subcategoryName || categoryName}
        </Text>

        {SUBCATEGORY_LIST.map((item) => (
          <ListingCard key={item.id} item={item} onPress={handleCardPress} />
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
    paddingTop: 16,
    paddingBottom: 100,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT_DARK,
  },
  cardSubtitle: {
    fontSize: 13,
    color: TEXT_LIGHT,
    marginTop: 4,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconBtn: {
    padding: 4,
  },
  iconDivider: {
    width: 1,
    height: 18,
    backgroundColor: BORDER,
    marginHorizontal: 8,
  },
});
