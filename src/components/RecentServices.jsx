import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListingCard from './ListingCard';

// Same image pattern as HorizontalCategories: new, new1, homescreen, background_img in rotation
const DUMMY_DATA = [
  { id: '1', title: 'Spice Garden Restaurant', subtitle: 'Sector 22, Chandigarh', image: require('../assets/images/new.png') },
  { id: '2', title: 'Hotel Royal Stay', subtitle: 'Zirakpur, Punjab', image: require('../assets/images/new1.png') },
  { id: '3', title: 'Urban Tandoor', subtitle: 'Phase 302, Mohali', image: require('../assets/images/homescreen.png') },
  { id: '4', title: 'Cafe Morning Brew', subtitle: 'Sector 35, Chandigarh', image: require('../assets/images/background_img.png') },
  { id: '5', title: 'Green Valley Resort', subtitle: 'Morni Hills', image: require('../assets/images/new.png') },
];

const MAX_ITEMS = 5;
const data = DUMMY_DATA.slice(0, MAX_ITEMS);

export default function RecentServices() {
  const handleViewAll = () => {};

  const renderItem = ({ item }) => (
    <ListingCard
      item={{ image: item.image, title: item.title, subtitle: item.subtitle }}
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
