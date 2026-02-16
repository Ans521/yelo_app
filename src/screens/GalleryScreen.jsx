import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import BackLogoHeader from '../components/common/BackLogoHeader';

const ORANGE = '#F08E14';
const BORDER = '#E5E7EB';
const { width } = Dimensions.get('window');
const GRID_PADDING = 16;
const GRID_GAP = 10;
const IMAGE_SIZE = (width - GRID_PADDING * 2 - GRID_GAP * 2) / 3;

const IMAGES = [
  { id: '1', src: require('../assets/images/bg1.png') },
  { id: '2', src: require('../assets/images/bg2.png') },
  { id: '3', src: require('../assets/images/background_img.png') },
  { id: '4', src: require('../assets/images/homescreen.png') },
  { id: '5', src: require('../assets/images/orange.png') },
  { id: '6', src: require('../assets/images/bg1.png') },
  { id: '7', src: require('../assets/images/bg2.png') },
  { id: '8', src: require('../assets/images/background_img.png') },
];

export default function GalleryScreen() {
  const navigation = useNavigation();
  const data = [...IMAGES, { id: 'add', add: true }];

  const handleSubmit = () => {
    navigation.navigate('ListingDetail');
  };

  const renderCell = (item) => {
    if (item.add) {
      return (
        <TouchableOpacity key="add" style={[styles.imageBox, styles.addBox]} activeOpacity={0.8}>
          <MaterialIcons name="add" size={32} color="#7C7C7C" />
        </TouchableOpacity>
      );
    }
    return (
      <Image key={item.id} source={item.src} style={styles.imageBox} resizeMode="cover" />
    );
  };

  const rows = [];
  for (let i = 0; i < data.length; i += 3) {
    rows.push(data.slice(i, i + 3));
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <BackLogoHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Gallery</Text>
        <View style={styles.grid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map((item) => renderCell(item))}
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
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
    paddingHorizontal: GRID_PADDING,
    paddingTop: 16,
    paddingBottom: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  grid: {
    paddingBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  imageBox: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  addBox: {
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: ORANGE,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
