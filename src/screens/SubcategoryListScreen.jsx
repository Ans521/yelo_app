import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackLogoHeader from '../components/common/BackLogoHeader';
import ListingCard from '../components/ListingCard';

const TEXT_DARK = '#111827';

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
          <ListingCard
            key={item.id}
            item={{
              image: item.image,
              title: item.name,
              subtitle: item.location,
            }}
            onPress={handleCardPress}
          />
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
    paddingBottom: 56,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 16,
  },
});
