import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CategoriesList from '../CategoriesList';
import { useAuth } from '../../context/AuthContext';

const HEADER_HEIGHT = 280;

const Header = ({ subcategories = [] }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { location } = useAuth();
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locationAddress, setLocationAddress] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    navigation.navigate('Category', {
      screen: 'SearchResults',
      params: { query: q },
    });
  };

  const handleOpenLocation = async () => {
    setLocationModalVisible(true);
    console.log('location', location);
    const lat = location?.latitude;
    const lon = location?.longitude;

    if (lat == null || lon == null) {
      setLocationAddress('');
      setLocationError('Location not available. Please enable location permissions.');
      return;
    }

    setLocationLoading(true);
    setLocationError('');
    setLocationAddress('');
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
        lat,
      )}&lon=${encodeURIComponent(lon)}&zoom=10&addressdetails=1`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'yelo-app/1.0',
        },
      });

      if (!res.ok) {
        throw new Error(`Reverse geocode failed with status ${res.status}`);
      }

      const data = await res.json();
      const addr = data?.address || {};
      const city =
        data?.display_name ||
        '';

      if (city) {
        setLocationAddress(city);
      } else {
        setLocationError('Unable to determine your city from location.');
      }
    } catch (e) {
      setLocationError('Failed to fetch location details.');
    } finally {
      setLocationLoading(false);
    }
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

        {/* Search row: input + icon buttons */}
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
          <View style={styles.iconButtonsWrap}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={handleSearch}
              activeOpacity={0.8}
            >
              <FontAwesome name="search" color="#6B7280" size={16} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={handleOpenLocation}
              activeOpacity={0.8}
            >
              <FontAwesome name="map-marker" color="#6B7280" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories List */}
        <CategoriesList subcategories={subcategories} />

        <Modal
          visible={locationModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setLocationModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Your location</Text>
              {locationLoading ? (
                <View style={styles.modalRow}>
                  <ActivityIndicator size="small" color="#F08E14" />
                  <Text style={styles.modalText}>Detecting your city...</Text>
                </View>
              ) : (
                <Text style={styles.modalText}>
                  {locationAddress ||
                    locationError ||
                    'Location information is not available at the moment.'}
                </Text>
              )}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setLocationModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: HEADER_HEIGHT,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    width: '100%',
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
  iconButtonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  modalButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: '#F08E14',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Header;