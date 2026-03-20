import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FALLBACK_CATEGORIES = [];
const FALLBACK_ICON = require('../assets/icons/bibimbap.png');

function normalizeCategories(apiCategories) {
  if (!Array.isArray(apiCategories) || apiCategories.length === 0) return FALLBACK_CATEGORIES;

  return apiCategories.map((c, i) => {
    let label = c.subcategory_name ?? c.name ?? 'Category';
    if (label.length > 10) {
      const spaceIndex = label.indexOf(' ', 10);
      if (spaceIndex !== -1) {
        label = label.slice(0, spaceIndex) + '\n' + label.slice(spaceIndex + 1);
      }
    }

    return {
      id: String(c.subcategory_id ?? c.id ?? i),
      label: label,
      icon: c.image_url ? { uri: c.image_url } : FALLBACK_ICON,
    };
  });
}

const CategoriesList = ({ subcategories = [] }) => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const list = normalizeCategories(subcategories);

  const handlePress = (item) => {
    setSelectedCategory(item.id);
    navigation.navigate('Category', {
      screen: 'SubcategoryList',
      params: {
        subcategoryId: item.id,
        subcategoryName: item.label,
        title: item.label,
      },
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {list.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => handlePress(item)}
              style={styles.itemWrap}
            >
              <View
                style={[
                  styles.iconBtn,
                  isSelected && styles.iconBtnSelected,
                ]}
              >
                <Image
                  source={item.icon}
                  style={styles.icon}
                  resizeMode="cover"
                />
              </View>
              {/* REMOVED numberOfLines={1} to allow wrapping */}
              <Text style={styles.label}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // Increased height slightly to accommodate the second line of text
    height: 100, 
    width: '100%',
  },
  listContent: {
    paddingHorizontal: 12,
    alignItems: 'flex-start', // Changed to flex-start so items align to top
    paddingTop: 8,
  },
  itemWrap: {
    alignItems: 'center',
    // marginRight: 4,
    width: 68, // Fixed width helps the text engine know when to wrap
  },
  iconBtn: {
    width: 57,
    height: 56,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  iconBtnSelected: {
    backgroundColor: '#FDBA74',
    borderColor: '#FDBA74',
  },
  icon: {
    width: 42,
    height: 42,
  },
  label: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
    // Wrapping logic:
    // flexWrap: 'wrap',
    width: '100%', 
  },
});

export default CategoriesList;