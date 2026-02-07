import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CategoryHeader from '../components/common/CategoryHeader';

const ORANGE = '#F08E14';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Dummy data with categories and subcategories
const CATEGORIES_DATA = [
  {
    id: '1',
    title: 'Dummy Category Name',
    subcategories: [
      { id: '1-1', name: 'RESTAURANT', icon: require('../assets/icons/restaurant.png') },
      { id: '1-2', name: 'FOOD', icon: require('../assets/icons/bibimbap.png') },
      { id: '1-3', name: 'REPAIR', icon: require('../assets/icons/mechanic.png') },
      { id: '1-4', name: 'HOTEL', icon: require('../assets/icons/hotel.png') },
    ],
  },
  {
    id: '2',
    title: 'Dummy Category Name',
    subcategories: [
      { id: '2-1', name: 'MEDICAL', icon: require('../assets/icons/healtcare.png') },
      { id: '2-2', name: 'RESTAURANT', icon: require('../assets/icons/restaurant.png') },
      { id: '2-3', name: 'FOOD', icon: require('../assets/icons/bibimbap.png') },
      { id: '2-4', name: 'HOTEL', icon: require('../assets/icons/hotel.png') },
    ],
  },
  {
    id: '3',
    title: 'Dummy Category Name',
    subcategories: [
      { id: '3-1', name: 'REPAIR', icon: require('../assets/icons/mechanic.png') },
      { id: '3-2', name: 'MEDICAL', icon: require('../assets/icons/healtcare.png') },
      { id: '3-3', name: 'FOOD', icon: require('../assets/icons/bibimbap.png') },
      { id: '3-4', name: 'RESTAURANT', icon: require('../assets/icons/restaurant.png') },
    ],
  },
  {
    id: '4',
    title: 'Dummy Category Name',
    subcategories: [
      { id: '4-1', name: 'HOTEL', icon: require('../assets/icons/hotel.png') },
      { id: '4-2', name: 'REPAIR', icon: require('../assets/icons/mechanic.png') },
      { id: '4-3', name: 'MEDICAL', icon: require('../assets/icons/healtcare.png') },
      { id: '4-4', name: 'FOOD', icon: require('../assets/icons/bibimbap.png') },
    ],
  },
];

function SubcategoryItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.subcategoryItem} onPress={() => onPress(item)} activeOpacity={0.7}>
      <View style={styles.subcategoryIconBox}>
        <Image source={item.icon} style={styles.subcategoryIcon} resizeMode="contain" />
      </View>
      <Text style={styles.subcategoryName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

function CategoryAccordion({ category, isExpanded, onToggle, onSubcategoryPress }) {
  const handleSubcategoryPress = (subcategory) => {
    onSubcategoryPress?.(category, subcategory);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.accordionTitle}>{category.title}</Text>
        <View style={[styles.accordionButton, isExpanded && styles.accordionButtonExpanded]}>
          <MaterialIcons
            name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={22}
            color="#ffffff"
          />
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.subcategoriesContainer}>
          <View style={styles.subcategoriesGrid}>
            {category.subcategories.map((sub) => (
              <SubcategoryItem key={sub.id} item={sub} onPress={handleSubcategoryPress} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

export default function CategoryScreen() {
  const navigation = useNavigation();
  // First category is open by default
  const [expandedIds, setExpandedIds] = useState(['1']);

  const handleSubcategoryPress = (category, subcategory) => {
    navigation.navigate('SubcategoryList', {
      categoryName: category.title,
      subcategoryName: subcategory.name,
    });
  };

  const toggleCategory = (categoryId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpandedIds((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <View style={styles.screen}>
      <CategoryHeader />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES_DATA.map((category) => (
          <CategoryAccordion
            key={category.id}
            category={category}
            isExpanded={expandedIds.includes(category.id)}
            onToggle={() => toggleCategory(category.id)}
            onSubcategoryPress={handleSubcategoryPress}
          />
        ))}
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
    paddingTop: 16,
  },
  accordionContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  accordionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accordionButtonExpanded: {
    backgroundColor: ORANGE,
  },
  subcategoriesContainer: {
    paddingBottom: 16,
  },
  subcategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subcategoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 12,
  },
  subcategoryIconBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  subcategoryIcon: {
    width: 36,
    height: 36,
  },
  subcategoryName: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374151',
    marginTop: 6,
    textAlign: 'center',
  },
});
