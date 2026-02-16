// src/screens/HomeScreen.jsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import HomeContent from '../components/HomeContent';
import HorizontalCategories from '../components/HorizontalCategories';
import RecentServices from '../components/RecentServices';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = 100 + insets.bottom;

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
        <Header />
        <HomeContent />
        <HorizontalCategories />
        <RecentServices />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});


