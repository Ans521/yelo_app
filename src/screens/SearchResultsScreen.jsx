import React, { useState, useEffect } from 'react';
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
import BackLogoHeader from '../components/common/BackLogoHeader';
import ListingCard from '../components/ListingCard';
import { useAuth } from '../context/AuthContext';
import { searchBusinesses } from '../services/authApi';

const TEXT_DARK = '#111827';
const FALLBACK_IMAGE = require('../assets/images/new.png');

function parseGallery(gallery) {
  if (Array.isArray(gallery)) return gallery;
  if (typeof gallery === 'string') {
    try {
      const parsed = JSON.parse(gallery);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function normalizeBusiness(b) {
  const id = String(b.business_id ?? b.id);
  const title = b.business_name ?? b.title ?? '';
  const subtitle = b.address ?? b.subtitle ?? '';
  const phone_no = b.phone_no ?? '';
  let image = FALLBACK_IMAGE;
  const gallery = parseGallery(b.gallery);
  if (gallery.length > 0) {
    const main = gallery.find((g) => g.isMain) ?? gallery[0];
    if (main?.url) image = { uri: main.url };
  }
  return { id, title, subtitle, image, phone_no };
}

const GUEST_SIGN_IN_TITLE = 'Please sign in';
const GUEST_SIGN_IN_MESSAGE = 'Sign in to view business details, call or share.';

export default function SearchResultsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isGuest, logout } = useAuth();
  const query = route.params?.query ?? '';

  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError(null);
      setIsLoading(true);
      const res = await searchBusinesses(query);
      if (cancelled) return;
      setIsLoading(false);
      if (res.success && Array.isArray(res.data)) {
        setBusinesses(res.data);
      } else {
        setError(res.message || 'Search failed.');
      }
    })();
    return () => { cancelled = true; };
  }, [query]);

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
        <BackLogoHeader />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#F08E14" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BackLogoHeader />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setIsLoading(true);
              setError(null);
              searchBusinesses(query).then((res) => {
                setIsLoading(false);
                if (res.success && Array.isArray(res.data)) setBusinesses(res.data);
                else setError(res.message || 'Search failed.');
              });
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const list = businesses.map(normalizeBusiness);
  const screenTitle = query ? `Search: "${query}"` : 'Search results';

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <BackLogoHeader />
<View style={styles.rowStyle}>


      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.categoryName}>{screenTitle}</Text>

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
      </ScrollView>

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
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 16,
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
