import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackLogoHeader from '../components/common/BackLogoHeader';
import ListingCard from '../components/ListingCard';

const ORANGE = '#F08E14';
const TEXT_DARK = '#111827';
const TEXT_LIGHT = '#6B7280';
const BORDER = '#E5E7EB';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TABS = ['About Us', 'Services', 'Gallery', 'Reviews'];

// Same image pattern: new, new1, homescreen, background_img in rotation
const SIMILAR_RESULTS = [
  { id: '1', name: 'Spice Garden Restaurant', location: 'Sector 22, Chandigarh', image: require('../assets/images/new.png') },
  { id: '2', name: 'Hotel Royal Stay', location: 'Zirakpur, Punjab', image: require('../assets/images/new1.png') },
  { id: '3', name: 'Urban Tandoor', location: 'Phase 3B2, Mohali', image: require('../assets/images/homescreen.png') },
  { id: '4', name: 'Cafe Morning Brew', location: 'Sector 35, Chandigarh', image: require('../assets/images/background_img.png') },
  { id: '5', name: 'Cafe Morning Brew', location: 'Sector 35, Chandigarh', image: require('../assets/images/background_img.png') },
  { id: '6', name: 'Green Valley Resort', location: 'Morni Hills', image: require('../assets/images/new.png') },

];

export default function ListingDetailScreen() {
  const [activeTab, setActiveTab] = useState('About Us');

  const handleCall = () => Linking.openURL('tel:+911234567890');
  const handleShare = () => {};
  const handleWhatsApp = () => Linking.openURL('https://wa.me/911234567890');

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <BackLogoHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        <Image
          source={require('../assets/images/new1.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Title row: name + rating */}
        <View style={styles.titleRow}>
          <Text style={styles.businessName}>Spice Garden Restaurant</Text>
          <View style={styles.ratingWrap}>
            <MaterialIcons name="star" size={18} color="#EAB308" />
            <Text style={styles.ratingText}>4.5 Reviews</Text>
          </View>
        </View>
        <Text style={styles.location}>Sector 22, Chandigarh</Text>

        {/* Action buttons: call, share, WhatsApp */}
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleCall} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialIcons name="call" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity onPress={handleShare} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialIcons name="share" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity onPress={handleWhatsApp} style={styles.actionBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="whatsapp" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab content - About Us */}
        {activeTab === 'About Us' && (
          <Text style={styles.aboutText}>
            Spice Garden Restaurant offers delicious North Indian and Chinese food in a comfortable
            family-friendly environment. Perfect for lunch and dinner with friends and family.
          </Text>
        )}
        {activeTab === 'Services' && (
          <Text style={styles.aboutText}>Services content can be added here.</Text>
        )}
        {activeTab === 'Gallery' && (
          <Text style={styles.aboutText}>Gallery content can be added here.</Text>
        )}
        {activeTab === 'Reviews' && (
          <Text style={styles.aboutText}>Reviews content can be added here.</Text>
        )}

        {/* Similar Results */}
        <View style={styles.similarSection}>
          <View style={styles.similarHeader}>
            <Text style={styles.similarTitle}>Similar Results</Text>
            <TouchableOpacity style={styles.seeMoreBtn} activeOpacity={0.7}>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {SIMILAR_RESULTS.map((item) => (
            <ListingCard
              key={item.id}
              item={{
                image: item.image,
                title: item.name,
                subtitle: item.location,
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 56,
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.6,
    backgroundColor: '#f0f0f0',
    borderRadius : 20,
    borderTopColor : 'black',
    borderTopWidth : 10,
    marginTop : 5
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_DARK,
    flex: 1,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: TEXT_LIGHT,
  },
  location: {
    fontSize: 14,
    color: TEXT_LIGHT,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
  },
  actionDivider: {
    width: 1,
    height: 24,
    backgroundColor: BORDER,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: -70,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  tabText: {
    fontSize: 15,
    color: TEXT_LIGHT,
    fontWeight: '500',
  },
  tabTextActive: {
    color: TEXT_DARK,
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: ORANGE,
    borderRadius: 2,
  },
  aboutText: {
    fontSize: 14,
    color: TEXT_LIGHT,
    lineHeight: 22,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  similarSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  similarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  similarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  seeMoreBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
