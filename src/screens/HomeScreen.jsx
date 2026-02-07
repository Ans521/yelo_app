// src/screens/HomeScreen.jsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/common/Header';
import HomeContent from '../components/HomeContent';
import HorizontalCategories from '../components/HorizontalCategories';
import RecentServices from '../components/RecentServices';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeContent />
        <HorizontalCategories />
        <RecentServices />
      </ScrollView>
    </View>
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


