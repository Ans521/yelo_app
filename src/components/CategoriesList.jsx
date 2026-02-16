import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const initialCategories = [
  { id: '1', icon: require('../assets/icons/restaurant.png'), label: 'RESTAURANT' },
  { id: '2', icon: require('../assets/icons/hotel.png'), label: 'HOTEL' },
  { id: '3', icon: require('../assets/icons/healtcare.png'), label: 'MEDICAL' },
  { id: '4', icon: require('../assets/icons/bibimbap.png'), label: 'FOOD' },
  { id: '5', icon: require('../assets/icons/mechanic.png'), label: 'REPAIR' },
  { id: '6', icon: require('../assets/icons/bibimbap.png'), label: 'MOBILE' },
  { id: '7', icon: require('../assets/icons/bibimbap.png'), label: 'SHOP' },
  { id: '8', icon: require('../assets/icons/bibimbap.png'), label: 'AUTO' },
  { id: '9', icon: require('../assets/icons/hotel.png'), label: 'BEAUTY' },
  { id: '10', icon: require('../assets/icons/bibimbap.png'), label: 'GROCERY' },
  { id: '11', icon: require('../assets/icons/bibimbap.png'), label: 'ELECTRONICS' }
];

const CategoriesList = () => {
  const [selectedCategory, setSelectedCategory] = useState('1');

  return (
    <View style={styles.root}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.scroll}
      >
        {initialCategories.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => setSelectedCategory(item.id)}
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
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.label} numberOfLines={1}>
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
    height: 88,
    width: '100%',
  },
  scroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingRight: 12,
  },
  itemWrap: {
    alignItems: 'center',
    marginRight: 6,
  },
  iconBtn: {
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  iconBtnSelected: {
    backgroundColor: '#FDBA74',
  },
  icon: {
    width: 28,
    height: 28,
  },
  label: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default CategoriesList;