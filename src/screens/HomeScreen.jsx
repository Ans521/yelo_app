// src/screens/HomeScreen.jsx
import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/common/Header';
import HomeContent from '../components/HomeContent';
export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
  
      {/* Header */}
      <Header />

      {/* Screen Content */}
      <View className="flex-1">
        <HomeContent />
      </View>

    </View>
  );
}


