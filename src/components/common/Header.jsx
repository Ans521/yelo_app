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
        <View style={styles.logoWrap}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Search + Actions */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrap}>
            <FontAwesome name="search" color="gray" size={15} />
            <TextInput
              placeholder="Search product, restaurant"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="notifications-none" color="gray" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
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
  logoWrap: {
    alignItems: 'center',
    paddingTop: 24,
  },
  logo: {
    width: 160,
    height: 60,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    paddingVertical: 4,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default Header;