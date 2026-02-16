import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import CategoriesList from '../CategoriesList';

const HEADER_HEIGHT = 280;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search:', searchQuery);
  };

  return (
    <View style={styles.header}>
      {/* Orange Gradient Background */}
      <ImageBackground
        source={require('../../assets/images/orange.png')}
        resizeMode="cover"
        style={styles.background}
      >
        {/* Black Mask Pattern Overlay */}
        <Image
          source={require('../../assets/images/mask.png')}
          style={styles.mask}
          resizeMode="cover"
        />

        {/* Logo */}
        <View className="items-center pt-12">
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-40 h-30"
            resizeMode="contain"
          />
        </View>

        {/* Search + Actions */}
        <View className="flex-row items-center px-4 mt-4 mb-6">
          <View className="flex-1 bg-white rounded-full flex-row items-center px-4 py-1 mr-2">
            <FontAwesome name="search" color="gray" size={15} />
            <TextInput
              placeholder="Search product, restaurant"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-gray-700 ml-2"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>

          <TouchableOpacity className="bg-white w-12 h-12 rounded-full items-center justify-center mr-2">
            <MaterialIcons name="notifications-none" color="gray" size={24} />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white w-12 h-12 rounded-full items-center justify-center">
            <Feather name="filter" color="gray" size={20} />
          </TouchableOpacity>
        </View>

        {/* Categories List */}
        <CategoriesList />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
});

export default Header;