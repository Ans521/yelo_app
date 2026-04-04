import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LogoHeader from '../components/common/LogoHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { getCategories } from '../services/authApi';

const ORANGE = '#F08E14';
const BORDER = '#E5E7EB';
const TEXT_DARK = '#111827';
const TEXT_LIGHT = '#6B7280';

const GUEST_SIGN_IN_TITLE = 'Please sign in';
const GUEST_SIGN_IN_MESSAGE =
  'Sign in or create an account to add and manage your business listings.';

export default function AddListingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isGuest, logout } = useAuth();
  const editBusiness = route.params?.editBusiness ?? null;
  const businessId = route.params?.businessId ?? null;

  const [servicesInput, setServicesInput] = useState('');
  const [services, setServices] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [aboutUs, setAboutUs] = useState('');

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategoriesForSelected, setSubcategoriesForSelected] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);

  const scrollViewRef = useRef(null);
  const servicesSectionYRef = useRef(0);

  useEffect(() => {
    if (isGuest) return;
    let cancelled = false;

    (async () => {
      setCategoriesLoading(true);
      const res = await getCategories();
      if (!cancelled && res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      }
      if (!cancelled) setCategoriesLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [isGuest]);

  if (isGuest) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <LogoHeader />
        <View style={styles.guestWrap}>
          <View style={styles.guestCard}>
            <View style={styles.guestIconCircle}>
              <MaterialIcons name="add-business" size={40} color={ORANGE} />
            </View>
            <Text style={styles.guestTitle}>{GUEST_SIGN_IN_TITLE}</Text>
            <Text style={styles.guestMessage}>{GUEST_SIGN_IN_MESSAGE}</Text>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => logout()}
              activeOpacity={0.8}
            >
              <MaterialIcons name="login" size={18} color="#ffffff" style={{marginRight: 8}} />
              <Text style={styles.guestButtonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const openCategoryDropdown = () => {
    setShowSubcategoryDropdown(false);
    setShowCategoryDropdown(true);
  };

  const openSubcategoryDropdown = () => {
    if (!selectedCategory) return;
    setShowCategoryDropdown(false);
    setShowSubcategoryDropdown(true);
  };

  const onSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(null);
    setShowCategoryDropdown(false);
  };

  const onSelectSubcategory = (sub) => {
    setSelectedSubcategory(sub);
    setShowSubcategoryDropdown(false);
  };

  useEffect(() => {
    const subcategoriesForSelected = selectedCategory
      ? selectedCategory.subcategories || []
      : [];
    setSubcategoriesForSelected(subcategoriesForSelected);
  }, [selectedCategory]);

  useEffect(() => {
    if (!editBusiness || !categories.length) return;

    setBusinessName(
      editBusiness.business_name ?? editBusiness.businessName ?? '',
    );

    const rawPhone = editBusiness.phone_no ?? '';
    setPhone(String(rawPhone).replace(/\D/g, '').slice(0, 10));

    setAddress(editBusiness.address ?? '');

    setAboutUs(editBusiness.aboutUs ?? editBusiness.about_us ?? '');

    const rawServices =
      editBusiness.services_offered ?? editBusiness.servicesOffered;

    let svc = [];

    if (Array.isArray(rawServices)) {
      svc = rawServices;
    } else if (typeof rawServices === 'string' && rawServices.trim()) {
      try {
        const parsed = JSON.parse(rawServices);
        if (Array.isArray(parsed)) svc = parsed;
      } catch {}
    }

    setServices(svc);

    const catId = editBusiness.categoryId ?? editBusiness.category_id;
    const subId = editBusiness.subcategoryId ?? editBusiness.subcategory_id;

    if (catId != null) {
      const cat = categories.find(
        (c) => (c.category_id ?? c.categoryId) === catId,
      );

      if (cat) {
        setSelectedCategory(cat);

        if (subId != null && (cat.subcategories || []).length) {
          const sub = cat.subcategories.find(
            (s) => (s.subcategory_id ?? s.subcategoryId) === subId,
          );
          if (sub) setSelectedSubcategory(sub);
        }
      }
    }
  }, [editBusiness, categories]);

  const addService = () => {
    if (!servicesInput.trim()) return;
    setServices((prev) => [...prev, servicesInput.trim()]);
    setServicesInput('');
  };

  const removeService = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const trimmedPhone = phone.trim();
    if (trimmedPhone.length !== 10) {
      Alert.alert('Invalid number', 'Please enter exactly 10 digits for Phone / WhatsApp number.');
      return;
    }
    const listingData = {
      business_name: businessName.trim(),
      categoryId: selectedCategory?.category_id ?? selectedCategory?.categoryId ?? null,
      subcategoryId: selectedSubcategory?.subcategory_id ?? selectedSubcategory?.subcategoryId ?? null,
      phone_no: trimmedPhone,
      address: address.trim(),
      aboutUs: aboutUs.trim(),
      services_offered: services,
    };

    navigation.navigate('Gallery', {
      listingData,
      editBusinessId: businessId,
      editBusinessGallery: editBusiness?.gallery ?? [],
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>

      <KeyboardAwareScrollView
        ref={scrollViewRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      <LogoHeader />
        <View style={styles.form}>
          <LabeledInput
            label="Business Name"
            placeholder="Enter business name"
            value={businessName}
            onChangeText={setBusinessName}
          />

          {/* CATEGORY */}

          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>

            <TouchableOpacity
              style={styles.inputContainer}
              onPress={openCategoryDropdown}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.textInput,
                  !selectedCategory && styles.placeholderText,
                ]}
              >
                {selectedCategory
                  ? (selectedCategory.category_name ?? selectedCategory.categoryName)
                  : 'Select category'}
              </Text>

              {categoriesLoading ? (
                <ActivityIndicator size="small" color={ORANGE} />
              ) : (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color={TEXT_LIGHT}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* SUB CATEGORY */}

          <View style={styles.section}>
            <Text style={styles.label}>Sub Category</Text>

            <TouchableOpacity
              style={[
                styles.inputContainer,
                !selectedCategory && styles.inputDisabled,
              ]}
              onPress={openSubcategoryDropdown}
              disabled={!selectedCategory}
            >
              <Text
                style={[
                  styles.textInput,
                  !selectedSubcategory && styles.placeholderText,
                ]}
              >
                {selectedSubcategory
                  ? (selectedSubcategory.subcategory_name ?? selectedSubcategory.subcategoryName)
                  : 'Select subcategory'}
              </Text>

              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color={TEXT_LIGHT}
              />
            </TouchableOpacity>
          </View>

          <LabeledInput
            label="Phone / WhatsApp Number"
            placeholder="Enter 10-digit number"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/\D/g, '').slice(0, 10))}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <LabeledInput
            label="Address"
            placeholder="Enter full address"
            value={address}
            onChangeText={setAddress}
          />

          <LabeledInput
            label="About Business"
            placeholder="Write short description about your business"
            multiline
            numberOfLines={4}
            style={{ height: 120, textAlignVertical: 'top' }}
            value={aboutUs}
            onChangeText={setAboutUs}
          />

          {/* SERVICES */}

          <View
            style={styles.section}
            onLayout={(e) => {
              servicesSectionYRef.current = e.nativeEvent.layout.y;
            }}
          >
            <Text style={styles.label}>Services Offered</Text>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TextInput
                  placeholder="e.g. Room booking etc"
                  placeholderTextColor={TEXT_LIGHT}
                  style={styles.textInput}
                  value={servicesInput}
                  onChangeText={setServicesInput}
                />
              </View>

              <TouchableOpacity
                onPress={addService}
                style={styles.addButton}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonText}>Add</Text>
                <MaterialIcons name="add" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.chips}>
              {services.map((service, index) => (
                <View key={`${service}-${index}`} style={styles.chip}>
                  <Text style={styles.chipText}>{service}</Text>

                  <TouchableOpacity
                    onPress={() => removeService(index)}
                    style={styles.chipClose}
                  >
                    <Text style={styles.chipCloseText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <Text style={styles.submitButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {/* Category Modal */}
      <Modal
        visible={showCategoryDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCategoryDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCategoryDropdown(false)}
        >
          <TouchableOpacity style={styles.modalCard} activeOpacity={1} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                onPress={() => setShowCategoryDropdown(false)}
                style={styles.modalCloseBtn}
              >
                <MaterialIcons name="close" size={22} color={TEXT_LIGHT} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={categories}
              keyExtractor={(item) => String(item.category_id ?? item.categoryId)}
              contentContainerStyle={styles.modalListContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    index === 0 && styles.modalItemFirst,
                    index === categories.length - 1 && styles.modalItemLast,
                  ]}
                  onPress={() => onSelectCategory(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.modalItemIconWrap}>
                    <MaterialIcons name="category" size={20} color={ORANGE} />
                  </View>
                  <Text style={styles.modalItemText}>
                    {item.category_name ?? item.categoryName ?? ''}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                !categoriesLoading ? (
                  <View style={styles.modalEmptyWrap}>
                    <MaterialIcons name="folder-open" size={48} color={BORDER} />
                    <Text style={styles.modalEmptyText}>No categories</Text>
                  </View>
                ) : null
              }
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Subcategory Modal */}
      <Modal
        visible={showSubcategoryDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSubcategoryDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSubcategoryDropdown(false)}
        >
          <TouchableOpacity style={styles.modalCard} activeOpacity={1} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedCategory
                  ? (selectedCategory.category_name ?? selectedCategory.categoryName ?? 'Subcategory')
                  : 'Subcategory'}
              </Text>
              <TouchableOpacity
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                onPress={() => setShowSubcategoryDropdown(false)}
                style={styles.modalCloseBtn}
              >
                <MaterialIcons name="close" size={22} color={TEXT_LIGHT} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={subcategoriesForSelected}
              keyExtractor={(item) => String(item.subcategory_id ?? item.subcategoryId)}
              contentContainerStyle={styles.modalListContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    index === 0 && styles.modalItemFirst,
                    index === subcategoriesForSelected.length - 1 && styles.modalItemLast,
                  ]}
                  onPress={() => onSelectSubcategory(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.modalItemIconWrapSub}>
                    <MaterialIcons name="label" size={18} color={ORANGE} />
                  </View>
                  <Text style={styles.modalItemText}>
                    {item.subcategory_name ?? item.subcategoryName ?? ''}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.modalEmptyWrap}>
                  <MaterialIcons name="label" size={48} color={BORDER} />
                  <Text style={styles.modalEmptyText}>No subcategories</Text>
                </View>
              }
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

function LabeledInput({
  label,
  placeholder,
  style,
  multiline,
  numberOfLines,
  value,
  onChangeText,
  keyboardType,
  maxLength,
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={TEXT_LIGHT}
          style={[styles.textInput, style]}
          multiline={multiline}
          numberOfLines={numberOfLines}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#D26100' },

  scroll: { flex: 1, backgroundColor: '#ffffff' },

  scrollContent: {
    // paddingHorizontal: 16,
    // paddingTop: 8,
    paddingBottom: 24,
  },

  form: { backgroundColor: '#fff', marginTop : 13, paddingHorizontal: 20 },

  section: { marginBottom: 16 },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 8,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    minHeight: 48,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    fontSize: 14,
    color: TEXT_DARK,
  },

  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: ORANGE,
    borderRadius: 20,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginRight: 4,
  },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  chipText: { color: '#fff', marginRight: 6 },

  chipClose: { paddingHorizontal: 4 },
  chipCloseText: { color: '#fff', fontSize: 18 },

  submitButton: {
    marginTop: 8,
    backgroundColor: ORANGE,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  inputDisabled: {
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    maxHeight: 400,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: '#F9FAFB',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalListContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  modalItemFirst: {
    marginTop: 0,
  },
  modalItemLast: {
    marginBottom: 0,
  },
  modalItemIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF5EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  modalItemIconWrapSub: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF5EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  modalItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: TEXT_DARK,
  },
  modalEmptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  modalEmptyText: {
    marginTop: 12,
    fontSize: 15,
    color: TEXT_LIGHT,
  },
  guestWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  guestCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  guestIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 10,
    textAlign: 'center',
  },
  guestMessage: {
    fontSize: 14,
    color: TEXT_LIGHT,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 21,
    paddingHorizontal: 8,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ORANGE,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});