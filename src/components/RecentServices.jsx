import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_ITEMS = 5;
const CARD_IMAGE_SIZE = (SCREEN_WIDTH - 32 - 24) * 0.32; // ~1/3 of card width (padding + gap)

// Same image pattern as HorizontalCategories: new, new1, homescreen, background_img in rotation
const DUMMY_DATA = [
  { id: '1', title: 'Spice Garden Restaurant', subtitle: 'Sector 22, Chandigarh', image: require('../assets/images/new.png') },
  { id: '2', title: 'Hotel Royal Stay', subtitle: 'Zirakpur, Punjab', image: require('../assets/images/new1.png') },
  { id: '3', title: 'Urban Tandoor', subtitle: 'Phase 302, Mohali', image: require('../assets/images/homescreen.png') },
  { id: '4', title: 'Cafe Morning Brew', subtitle: 'Sector 35, Chandigarh', image: require('../assets/images/background_img.png') },
  { id: '5', title: 'Green Valley Resort', subtitle: 'Morni Hills', image: require('../assets/images/new.png') },
];

const data = DUMMY_DATA.slice(0, MAX_ITEMS);

function RecentServiceCard({ item }) {
  const handleCall = () => {};
  const handleWhatsApp = () => {};
  const handleShare = () => {};

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardRight}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {item.subtitle}
        </Text>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleCall} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialIcons name="call" size={20} color="#6B7280" />
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity onPress={handleWhatsApp} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="whatsapp" size={20} color="#6B7280" />
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity onPress={handleShare} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialIcons name="share" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function RecentServices() {
  const handleViewAll = () => {};

  const renderItem = ({ item }) => <RecentServiceCard item={item} />;
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
        ItemSeparatorComponent={() => <View style={styles.cardGap} />}
        listKey="recent-services"
      />
    </View>
  );
}

const SECTION_GAP = 24;

const styles = StyleSheet.create({
  container: {
    marginTop: SECTION_GAP,
    marginBottom: SECTION_GAP,
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardImage: {
    width: CARD_IMAGE_SIZE,
    height: CARD_IMAGE_SIZE,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardRight: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
  },
  cardGap: {
    height: 12,
  },
});
