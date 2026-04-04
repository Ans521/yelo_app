import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  Share,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackLogoHeader from '../components/common/BackLogoHeader';
import ListingCard from '../components/ListingCard';
import { useAuth } from '../context/AuthContext';
import { useBusinessById } from '../hooks/useBusinessById';

const ORANGE = '#F08E14';
const TEXT_DARK = '#111827';
const TEXT_LIGHT = '#6B7280';
const BORDER = '#E5E7EB';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FALLBACK_IMAGE = require('../assets/images/new1.png');

const TABS = ['About Us', 'Services', 'Gallery'];

function normalizeSimilarBusiness(b) {
  console.log("b", b)
  const id = String(b.business_id ?? b.id);
  const title = b.business_name ?? b.title ?? '';
  const subtitle = b.address ?? b.subtitle ?? '';
  const phone_no = b.phone_no ?? '';
  let image = FALLBACK_IMAGE;
  if (Array.isArray(b.gallery) && b.gallery.length > 0) {
    const main = b.gallery.find((g) => g.isMain) ?? b.gallery[0];
    if (main?.url) image = { uri: main.url };
  }
  return { id, title, subtitle, image, phone_no };
}

function getHeroImage(business) {
  if (!business) return FALLBACK_IMAGE;
  const gallery = business?.gallery;
  if (Array.isArray(gallery) && gallery.length > 0) {
    const main = gallery.find((g) => g.isMain) ?? gallery[0];
    if (main?.url) return { uri: main.url };
  }
  return FALLBACK_IMAGE;
}

export default function ListingDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { isGuest, logout } = useAuth();
  const businessId = route.params?.businessId ?? undefined;
  const { data, isLoading, isError, error, refetch } = useBusinessById(businessId);
  const business = data?.data;
  const similarBusinesses = data?.similar_businesses ?? [];
  const [activeTab, setActiveTab] = useState('About Us');
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const phoneNo = business?.phone_no ?? '';
  const handleCall = () => {
    if (phoneNo) Linking.openURL(`tel:${phoneNo}`);
  };
  const handleWhatsApp = () => {
    if (!phoneNo) return;
    const cleaned = phoneNo.replace(/\D/g, '');
    const waNumber = cleaned.length === 10 ? `91${cleaned}` : cleaned;
    Linking.openURL(`https://wa.me/${waNumber}`);
  };
  const handleShare = () => { 
    const title = business?.business_name ?? '';
    const address = business?.address ?? '';
    const msg = `Check out ${title} on Yelo: ${address}`.trim();
    Share.share({ message: msg || 'Check out this business on Yelo.' }).catch(() => {});
  };

  if (!businessId) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <BackLogoHeader />
        <View style={styles.centered}>
          <Text style={styles.errorText}>No business selected.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <BackLogoHeader />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={ORANGE} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !business) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <BackLogoHeader />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error?.message ?? 'Failed to load business.'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()} activeOpacity={0.8}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const heroImage = getHeroImage(business);
  const businessName = business?.business_name ?? business?.businessName ?? '--';
  const address = business?.address ?? '';
  const aboutUs = business?.about_us ?? business?.aboutUs ?? '';
  const servicesOffered = Array.isArray(business.services_offered)
    ? business?.services_offered
    : Array.isArray(business?.servicesOffered)
      ? business?.servicesOffered
      : [];
  const gallery = Array.isArray(business?.gallery) ? business?.gallery : [];
  const reviewRaw = business?.review ?? '';
  const review = reviewRaw !== '' && reviewRaw != null && !Number.isNaN(Number(reviewRaw))
    ? Number(reviewRaw).toFixed(2)
    : reviewRaw;

  const handleSimilarCardPress = (item) => {
    if (isGuest) {
      Alert.alert('Please sign in', 'Sign in to view business details.', [
        { text: 'OK' },
        { text: 'Sign in', onPress: () => logout() },
      ]);
      return;
    }
    const id = item.business_id ?? item.id;
    navigation.navigate('ListingDetail', { businessId: id });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <BackLogoHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={heroImage} style={styles.heroImage} resizeMode="cover" />

        <View style={styles.titleRow}>
          <Text style={styles.businessName} numberOfLines={2}>{businessName}</Text>
          {review ? (
            <View style={styles.ratingWrap}>
              <MaterialIcons name="star" size={18} color="#EAB308" />
              <Text style={styles.ratingText}>{review}</Text>
            </View>
          ) : null}
        </View>
        {address ? <Text style={styles.location}>{address}</Text> : null}

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleCall} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialIcons name="call" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity onPress={handleShare} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialIcons name="share" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity onPress={handleWhatsApp} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="whatsapp" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionSeparator} />

        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'About Us' && (
          <Text style={styles.aboutText}>{aboutUs || 'No description available.'}</Text>
        )}
        {activeTab === 'Services' && (
          <View style={styles.aboutText}>
            {servicesOffered.length > 0 ? (
              servicesOffered.map((s, i) => (
                <Text key={i} style={styles.serviceItem}>• {s}</Text>
              ))
            ) : (
              <Text style={styles.aboutText}>No services listed.</Text>
            )}
          </View>
        )}
        {activeTab === 'Gallery' && (
          <View style={styles.galleryGrid}>
            {gallery.length > 0 ? (
              gallery.map((g, i) => (
                g?.url ? (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.9}
                    onPress={() => {
                      setLightboxImage(g.url);
                      setLightboxVisible(true);
                    }}
                  >
                    <Image source={{ uri: g.url }} style={styles.galleryThumb} resizeMode="cover" />
                  </TouchableOpacity>
                ) : null
              ))
            ) : (
              <Text style={styles.aboutText}>No gallery images.</Text>
            )}
          </View>
        )}
       

        <View style={styles.similarSection}>
          <Text style={styles.similarTitle}>Similar Results</Text>
          {similarBusinesses.length > 0 ? (
            similarBusinesses.map((b) => {
              const item = normalizeSimilarBusiness(b);
              return (
                <ListingCard
                  key={item.id}
                  item={item}
                  onPress={() => handleSimilarCardPress(b)}
                  requireSignIn={isGuest}
                  onSignInRequested={logout}
                />
              );
            })
          ) : (
            <Text style={styles.aboutText}>More businesses in this category coming soon.</Text>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={lightboxVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLightboxVisible(false)}
      >
        <View style={styles.lightboxOverlay}>
          <TouchableOpacity
            style={styles.lightboxClose}
            onPress={() => setLightboxVisible(false)}
            activeOpacity={0.8}
          >
            <MaterialIcons name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
          {lightboxImage && (
            <Image
              source={{ uri: lightboxImage }}
              style={styles.lightboxImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#D26100' },
  scroll: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { paddingBottom: 56 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 12, fontSize: 14, color: TEXT_LIGHT },
  errorText: { fontSize: 14, color: '#DC2626', textAlign: 'center' },
  retryButton: {
    marginTop: 16,
    backgroundColor: ORANGE,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  heroImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.6,
    backgroundColor: '#f0f0f0',
    // borderRadius: 20,
    // marginTop: 5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  businessName: { fontSize: 20, fontWeight: '700', color: TEXT_DARK, flex: 1 },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 14, color: TEXT_LIGHT },
  location: { fontSize: 14, color: TEXT_LIGHT, paddingHorizontal: 16, paddingTop: 4 },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  actionBtn: { flex: 1, alignItems: 'center' },
  actionDivider: { width: 1, height: 24, backgroundColor: BORDER },
  sectionSeparator: {
    height: 1,
    backgroundColor: BORDER,
    marginTop: 16,
    marginHorizontal: 16,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginBottom: 8,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 6 },
  tabText: { fontSize: 15, color: TEXT_LIGHT, fontWeight: '500' },
  tabTextActive: { color: TEXT_DARK, fontWeight: '600' },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: ORANGE,
    borderRadius: 2,
  },
  aboutText: { fontSize: 14, color: TEXT_LIGHT, lineHeight: 22, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  serviceItem: { fontSize: 14, color: TEXT_LIGHT, lineHeight: 24, paddingHorizontal: 16 },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding : 5,
    marginLeft : 5,
    marginTop : 10
  },
  galleryThumb: {
    width: (SCREEN_WIDTH - 48) / 3,
    height: (SCREEN_WIDTH - 48) / 3,
    borderRadius: 8,
    marginRight: 10
  },
  similarSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  similarTitle: { fontSize: 18, fontWeight: '700', color: TEXT_DARK, marginBottom: 8 },
  lightboxOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightboxImage: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH - 80,
  },
  lightboxClose: {
    position: 'absolute',
    top: 40,
    right: 24,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
