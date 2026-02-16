// src/screens/HomeScreen.jsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import HomeContent from '../components/HomeContent';
import HorizontalCategories from '../components/HorizontalCategories';
import RecentServices from '../components/RecentServices';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Header />
      <View style={styles.scrollWrapper}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={true}
        >
          <HomeContent />
          <HorizontalCategories />
          <RecentServices />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollWrapper: {
    flex: 1,
    minHeight: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});


