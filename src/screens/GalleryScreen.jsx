import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import BackLogoHeader from '../components/common/BackLogoHeader';
import { addBusiness, updateBusiness, uploadImage } from '../services/authApi';
import { useAuth } from '../context/AuthContext';

const ORANGE = '#F08E14';
const BORDER = '#E5E7EB';
const { width } = Dimensions.get('window');
const GRID_PADDING = 16;
const GRID_GAP = 10;
const IMAGE_SIZE = (width - GRID_PADDING * 2 - GRID_GAP * 2) / 3;

const pickerOptions = {
  mediaType: 'photo',
  maxWidth: 640,
  maxHeight: 640,
  quality: 0.5,
  saveToPhotos: false,
};

function normalizeGallery(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  const normalized = raw.map((img) => {
    if (typeof img === 'string') return { url: img, isMain: false };
    return {
      url: img.url ?? img.uri ?? img.image_url ?? '',
      isMain: Boolean(img.isMain),
    };
  });
  const hasMain = normalized.some((i) => i.isMain);
  if (!hasMain && normalized.length > 0) normalized[0].isMain = true;
  return normalized;
}

export default function GalleryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const listingData = route.params?.listingData ?? {};
  const editBusinessId = route.params?.editBusinessId ?? null;
  const editBusinessGallery = route.params?.editBusinessGallery ?? [];
  const isEditMode = Boolean(editBusinessId);
  const [gallery, setGallery] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { location, setLocation } = useAuth();

  const fetchLocationIfNeeded = async () => {
    if (location?.latitude != null && location?.longitude != null) {
      return { latitude: location.latitude, longitude: location.longitude };
    }
    let coords = { latitude: null, longitude: null };
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message: 'We use your location for your business listing.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return coords;
      }
      await new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          (pos) => {
            coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
            setLocation(coords);
            resolve();
          },
          () => resolve(),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
        );
      });
    } catch (_) {}
    return coords;
  };

  useEffect(() => {
    if (Array.isArray(editBusinessGallery) && editBusinessGallery.length > 0) {
      setGallery(normalizeGallery(editBusinessGallery));
    }
  }, [editBusinessGallery]);

  const handleImageResult = async (res) => {
    if (!res || res.didCancel) return;
    if (res.errorCode) {
      Alert.alert('Error', res.errorMessage || 'Could not pick image.');
      return;
    }
    const asset = res.assets?.[0];
    if (!asset?.uri) return;

    const imagePayload = {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      fileName: asset.fileName || `image_${Date.now()}.jpg`,
    };

    setUploading(true);
    const result = await uploadImage(imagePayload);
    setUploading(false);

    if (result.success && result.url) {
      setGallery((prev) => {
        const isFirst = prev.length === 0;
        return [...prev, { url: result.url, isMain: isFirst }];
      });
    } else {
      Alert.alert('Upload failed', result.message || 'Could not upload image.');
    }
  };

  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera permission',
          message: 'This app needs camera access to take photos for your listing.',
          buttonNeutral: 'Ask Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission needed', 'Camera permission is required to take photos.');
        return;
      }
    }
    launchCamera({ ...pickerOptions, cameraType: 'back' }, handleImageResult);
  };

  const openGallery = () => {
    launchImageLibrary(pickerOptions, handleImageResult);
  };

  const openAddPhotoOptions = () => {
    Alert.alert('Add photo', 'Choose a source', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const removeImageAtIndex = (indexToRemove) => {
    setGallery((prev) => {
      const next = prev.filter((_, i) => i !== indexToRemove);
      const hadMain = prev[indexToRemove]?.isMain;
      if (hadMain && next.length > 0 && !next.some((i) => i.isMain)) {
        next[0].isMain = true;
      }
      return next;
    });
  };

  const setMainImage = (index) => {
    setGallery((prev) =>
      prev.map((item, i) => ({ ...item, isMain: i === index }))
    );
  };

  const handleSubmit = async () => {
    const coords = await fetchLocationIfNeeded();
    const formData = new FormData();
    formData.append('business_name', listingData.business_name ?? '');
    formData.append('categoryId', String(listingData.categoryId ?? ''));
    formData.append('subcategoryId', String(listingData.subcategoryId ?? ''));
    formData.append('phone_no', listingData.phone_no ?? '');
    formData.append('address', listingData.address ?? '');
    formData.append('aboutUs', listingData.aboutUs ?? '');
    console.log('[Location] GalleryScreen coords for submit', coords);
    formData.append(
      'lat',
      coords.latitude != null ? String(coords.latitude) : '',
    );
    formData.append(
      'long',
      coords.longitude != null ? String(coords.longitude) : '',
    );
    if (Array.isArray(listingData.services_offered) && listingData.services_offered.length) {
      formData.append('services_offered', JSON.stringify(listingData.services_offered));
    }
    formData.append('gallery', JSON.stringify(gallery.map(({ url, isMain }) => ({ url, isMain }))));

    console.log("formdaat a", formData);
    setSubmitting(true);
    const result = isEditMode
      ? await updateBusiness(editBusinessId, formData)
      : await addBusiness(formData);
    setSubmitting(false);

    if (result.success) {
      Alert.alert(
        isEditMode ? 'Updated' : 'Submitted',
        isEditMode
          ? 'Business has been updated successfully.'
          : "Your business has been submitted, it's under review. Please wait till it get verified.",
        [
          {
            text: 'OK',
            onPress: () => navigation.getParent()?.navigate('Home'),
          },
        ]
      );
    } else {
      Alert.alert('Error', result.message || (isEditMode ? 'Failed to update business.' : 'Failed to add business.'));
    }
  };

  const data = [
    ...gallery.map((img, i) => ({ id: `img-${i}`, url: img.url, isMain: img.isMain, index: i })),
    { id: 'add', add: true },
  ];

  const renderCell = (item) => {
    if (item.add) {
      return (
        <TouchableOpacity
          key="add"
          style={[styles.imageBox, styles.addBox]}
          onPress={openAddPhotoOptions}
          activeOpacity={0.8}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color={ORANGE} size="small" />
          ) : (
            <MaterialIcons name="add" size={32} color="#7C7C7C" />
          )}
        </TouchableOpacity>
      );
    }
    return (
      <View key={item.id} style={styles.imageWrapper}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setMainImage(item.index)}
          style={styles.imageTouch}
        >
          <Image source={{ uri: item.url }} style={styles.imageBox} resizeMode="cover" />
          {item.isMain && (
            <View style={styles.mainBadge}>
              <MaterialIcons name="star" size={20} color="yellow" />
              <Text style={styles.mainBadgeText}>Main</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeBadge}
          onPress={() => removeImageAtIndex(item.index)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="close" size={14} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  };

  const rows = [];
  for (let i = 0; i < data.length; i += 3) {
    rows.push(data.slice(i, i + 3));
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
      <BackLogoHeader />
      <View style={styles.rowStyle}>
        <Text style={styles.title}>Gallery</Text>
        <View style={styles.grid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map((item) => renderCell(item))}
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.85}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>{isEditMode ? 'UPDATE' : 'SUBMIT'}</Text>
          )}
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D26100',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    // paddingHorizontal: GRID_PADDING,
    // paddingTop: 16,
    paddingBottom: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  rowStyle: {
    paddingHorizontal: 20,
    paddingTop: 16,
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
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    position: 'relative',
  },
  imageTouch: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mainBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  mainBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  imageBox: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  removeBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBox: {
    borderWidth: 1,
    borderColor: BORDER,
    borderStyle: 'dashed',
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
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
