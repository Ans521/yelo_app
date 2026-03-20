import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CategoryHeader from '../components/common/CategoryHeader';
import { getCategories } from '../services/authApi';

const ORANGE = '#F08E14';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function SubcategoryItem({ item, onPress }) {
  const hasImage = item.image_url && String(item.image_url).trim().length > 0;
  return (
    <TouchableOpacity style={styles.subcategoryItem} onPress={() => onPress(item)} activeOpacity={0.7}>
      <View style={styles.subcategoryIconBox}>
        {hasImage ? (
          <Image source={{ uri: item.image_url }} style={styles.subcategoryIcon} resizeMode="cover" />
        ) : (
          <MaterialIcons name="label" size={28} color={ORANGE} />
        )}
      </View>
      <Text style={styles.subcategoryName} numberOfLines={1}>
        {item.subcategory_name}
      </Text>
    </TouchableOpacity>
  );
}

function CategoryAccordion({ category, isExpanded, onToggle, onSubcategoryPress }) {
  const handleSubcategoryPress = (subcategory) => {
    onSubcategoryPress?.(category, subcategory);
  };

  const subcategories = category.subcategories || [];

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.accordionTitle}>{category.category_name}</Text>
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
            {subcategories.map((sub) => (
              <SubcategoryItem key={sub.subcategory_id} item={sub} onPress={handleSubcategoryPress} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

export default function CategoryScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await getCategories();
      if (!cancelled && res.success && Array.isArray(res.data)) {
        setCategories(res.data);
        if (res.data.length > 0) {
          setExpandedIds([res.data[0].category_id]);
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSubcategoryPress = (category, subcategory) => {
    navigation.navigate('SubcategoryList', {
      categoryName: category.category_name,
      subcategoryName: subcategory.subcategory_name,
      categoryId: category.category_id,
      subcategoryId: subcategory.subcategory_id,
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

  if (loading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <CategoryHeader />
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={ORANGE} />
          <Text style={styles.loadingText}>Loading categories…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.scrollWrapper}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={true}
        >
          <CategoryHeader />
          {categories.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No categories yet</Text>
            </View>
          ) : (
            categories.map((category) => (
              <CategoryAccordion
                key={category.category_id}
                category={category}
                isExpanded={expandedIds.includes(category.category_id)}
                onToggle={() => toggleCategory(category.category_id)}
                onSubcategoryPress={handleSubcategoryPress}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D26100',
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  emptyWrap: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
  },
  scrollWrapper: {
    flex: 1,
    minHeight: 0,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    // paddingTop: 16,
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  subcategoryIcon: {
    width: 50,
    height: 50,
  },
  subcategoryName: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374151',
    marginTop: 6,
    textAlign: 'center',
  },
});
