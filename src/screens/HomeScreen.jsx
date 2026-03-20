// src/screens/HomeScreen.jsx
import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import HomeContent from '../components/HomeContent';
import HorizontalCategories from '../components/HorizontalCategories';
import RecentServices from '../components/RecentServices';
import { useAuth } from '../context/AuthContext';
import { useHomeFeed } from '../hooks/useHomeFeed';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isGuest, logout } = useAuth();
  const bottomPadding = 100 + insets.bottom;
  const { data, isLoading, isError, error, refetch } = useHomeFeed();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#F08E14" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error?.message ?? 'Something went wrong'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()} activeOpacity={0.8}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { subcategories = [], popular_businesses = [], recent_businesses = [] } = data ?? {};

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        keyboardShouldPersistTaps="handled"
      >
        <Header subcategories={subcategories} />
        <HomeContent />
        <HorizontalCategories businesses={popular_businesses} isGuest={isGuest} onSignInRequested={logout} />
        <RecentServices businesses={recent_businesses} isGuest={isGuest} onSignInRequested={logout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D26100', // dark orange behind notch / status bar
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 100,
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
});


