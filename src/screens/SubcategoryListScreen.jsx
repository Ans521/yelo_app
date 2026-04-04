import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListingCard from '../components/ListingCard';
import { useAuth } from '../context/AuthContext';
import { useBusinesses } from '../hooks/useBusinesses';
import LogoHeader from '../components/common/LogoHeader';

const GUEST_SIGN_IN_TITLE = 'Please sign in';
const GUEST_SIGN_IN_MESSAGE = 'Sign in to view business details, call or share.';

const TEXT_DARK = '#111827';
const FALLBACK_IMAGE = require('../assets/images/new.png');

function normalizeBusiness(b) {
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

export default function SubcategoryListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isGuest, logout } = useAuth();
  const subcategoryId = route.params?.subcategoryId;
  const mode = route.params?.mode;
  const screenTitle =
    route.params?.title ??
    route.params?.subcategoryName ??
    route.params?.categoryName ??
    (mode === 'popular' ? 'Popular Services' : mode === 'recent' ? 'Newly Added' : 'Businesses');

  const {
    data: businesses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useBusinesses({
    subCatId: subcategoryId,
    isPopular: mode === 'popular',
    isRecent: mode === 'recent',
    enabled: !!subcategoryId || mode === 'popular' || mode === 'recent',
  });

  const handleCardPress = (item) => {
    if (isGuest) {
      Alert.alert(GUEST_SIGN_IN_TITLE, GUEST_SIGN_IN_MESSAGE, [
        { text: 'OK' },
        { text: 'Sign in', onPress: () => logout() },
      ]);
      return;
    }
    const businessId = item.business_id ?? item.id;
    navigation.navigate('AddListing', {
      screen: 'ListingDetail',
      params: { businessId },
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <LogoHeader />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#F08E14" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <LogoHeader />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error?.message ?? 'Something went wrong'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()} activeOpacity={0.8}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const list = businesses.map(normalizeBusiness);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LogoHeader />
        <Text style={styles.categoryName} numberOfLines={1}>{screenTitle}</Text>
        <View style={styles.rowStyle}>
          {list.length === 0 ? (
            <Text style={styles.emptyText}>No businesses found.</Text>
          ) : (
            list.map((item, idx) => (
              <ListingCard
                key={item.id}
                item={item}
                onPress={() => handleCardPress(businesses[idx] ?? item)}
                requireSignIn={isGuest}
                onSignInRequested={logout}
              />
            ))
          )}
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
    // paddingTop: 16,
    paddingBottom: 56,
  },
  rowStyle: {
    paddingHorizontal: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 16,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 14,
    color: '#DC2626',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#F08E14',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});
