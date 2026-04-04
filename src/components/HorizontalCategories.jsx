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
  Linking,
  Share,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GUEST_ACTION_TITLE = 'Please sign in';
const GUEST_ACTION_MESSAGE = 'Sign in to call, message or share.';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_ITEMS = 5;
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_MARGIN = 12;
const IMAGE_SIZE = CARD_WIDTH * 0.5;

const FALLBACK_IMAGE = require('../assets/images/new.png');

function normalizeBusiness(b, index) {
  const id = String(b.business_id ?? b.id ?? index);
  const title = b.business_name ?? b.title ?? '';
  const subtitle = b.address ?? b.subtitle ?? '';
  const phone_no = b.phone_no ?? '';
  let image = FALLBACK_IMAGE;
  if (Array.isArray(b.gallery) && b.gallery.length > 0) {
    const main = b.gallery.find((g) => g.isMain) ?? b.gallery[0];
    if (main?.url) {
      image = { uri: main.url };
    }
  }

  return { id, title, subtitle, image, phone_no };
}

function ServiceCard({ item, onPress, requireSignIn, onSignInRequested }) {
  const showGuestAlert = () => {
    Alert.alert(GUEST_ACTION_TITLE, GUEST_ACTION_MESSAGE, [
      { text: 'OK' },
      { text: 'Sign in', onPress: () => onSignInRequested?.() },
    ]);
  };

  const handleCall = (e) => {
    e?.stopPropagation?.();
    if (requireSignIn) {
      showGuestAlert();
      return;
    }
    if (!item.phone_no) return;
    Linking.openURL(`tel:${item.phone_no}`);
  };
  const handleWhatsApp = (e) => {
    e?.stopPropagation?.();
    if (requireSignIn) {
      showGuestAlert();
      return;
    }
    if (!item.phone_no) return;
    const cleaned = item.phone_no.replace(/\D/g, '');
    const waNumber = cleaned.length === 10 ? `91${cleaned}` : cleaned;
    Linking.openURL(`https://wa.me/${waNumber}`);
  };

  const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.yelo";
  const handleShare = (e) => {
    e?.stopPropagation?.();
    if (requireSignIn) {
      showGuestAlert();
      return;
    }
    const message = `Check out this business on Yelo:\n${item.title} - ${item.subtitle}\n${PLAYSTORE_URL}`;
    Share.share({ message }).catch(() => {});
  };

  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={() => onPress?.(item)} activeOpacity={0.9}>
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
    </TouchableOpacity>
  );
}
export default function HorizontalCategories({ businesses = [], isGuest, onSignInRequested }) {
  const navigation = useNavigation();
  const handleViewAll = () => {
    navigation.navigate('Category', {
      screen: 'SubcategoryList',
      params: { mode: 'popular', title: 'Popular Services' },
    });
  };
  const data = businesses.slice(0, MAX_ITEMS).map(normalizeBusiness);

  const handleCardPress = (item) => {
    if (isGuest) {
      Alert.alert(GUEST_ACTION_TITLE, GUEST_ACTION_MESSAGE, [
        { text: 'OK' },
        { text: 'Sign in', onPress: () => onSignInRequested?.() },
      ]);
      return;
    }
    const businessId = item.business_id ?? item.id;
    navigation.navigate('AddListing', {
      screen: 'ListingDetail',
      params: { businessId },
    });
  };
  const renderItem = ({ item }) => (
    <ServiceCard
      item={item}
      onPress={handleCardPress}
      requireSignIn={isGuest}
      onSignInRequested={onSignInRequested}
    />
  );

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
