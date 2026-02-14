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
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_MARGIN = 12;
const IMAGE_SIZE = CARD_WIDTH * 0.5;

const DUMMY_DATA = [
  {
    id: '1',
    title: 'Spice Garden Restaurant',
    subtitle: 'Sector 22, Chandigarh',
    image: require('../assets/images/new.png'),
  },
  {
    id: '2',
    title: 'Hotel Royal Stay',
    subtitle: 'Zirakpur, Punjab',
    image: require('../assets/images/new1.png'),
  },
  {
    id: '3',
    title: 'Cafe Morning Brew',
    subtitle: 'Sector 35, Chandigarh',
    image: require('../assets/images/homescreen.png'),
  },
  {
    id: '4',
    title: 'Green Valley Resort',
    subtitle: 'Morni Hills',
    image: require('../assets/images/background_img.png'),
  },
  {
    id: '5',
    title: 'City Spa & Salon',
    subtitle: 'Sector 17, Chandigarh',
    image: require('../assets/images/new.png'),
  },
];

const data = DUMMY_DATA.slice(0, MAX_ITEMS);

function ServiceCard({ item }) {
  const handleCall = () => {};
  const handleWhatsApp = () => {};
  const handleShare = () => {};

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {item.subtitle}
        </Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={handleCall}
            style={styles.actionBtn}
            activeOpacity={0.7}
          >
            <MaterialIcons name="call" size={20} color="#6B7280" />
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity
            onPress={handleWhatsApp}
            style={styles.actionBtn}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="whatsapp" size={20} color="#6B7280" />
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity
            onPress={handleShare}
            style={styles.actionBtn}
            activeOpacity={0.7}
          >
            <MaterialIcons name="share" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </View>
  );
}

export default function HorizontalCategories() {
  const handleViewAll = () => {};

  const renderItem = ({ item }) => <ServiceCard item={item} />;

  const keyExtractor = (item) => item.id;

  const getItemLayout = (_, index) => ({
    length: CARD_WIDTH + CARD_MARGIN * 2,
    offset: (CARD_WIDTH + CARD_MARGIN * 2) * index,
    index,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Services</Text>
        <TouchableOpacity
          onPress={handleViewAll}
          style={styles.arrowButton}
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-forward" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
}

const SECTION_GAP = 24;

const styles = StyleSheet.create({
  container: {
    marginTop: SECTION_GAP,
    marginBottom: 8,
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
  listContent: {
    paddingLeft: 12,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: CARD_MARGIN,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardImage: {
    width: '100%',
    height: IMAGE_SIZE,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
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
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
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
});
