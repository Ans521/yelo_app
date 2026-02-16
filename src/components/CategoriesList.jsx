import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
  const [categories, setCategories] = useState(initialCategories);

  const renderItem = ({ item, drag, isActive }) => {
    const isSelected = selectedCategory === item.id;

    return (
      <ScaleDecorator>
        <View style={styles.itemWrap}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSelectedCategory(item.id)}
            onLongPress={drag}
            disabled={isActive}
            style={[
              styles.iconBtn,
              isSelected && styles.iconBtnSelected,
              isActive && styles.iconBtnActive,
            ]}
          >
            <Image
              source={item.icon}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.label} numberOfLines={1}>
            {item.label}
          </Text>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <DraggableFlatList
          data={categories}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setCategories(data)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: { height: 88 },
  container: { height: 88, justifyContent: 'center' },
  listContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
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
  iconBtnActive: {
    opacity: 0.7,
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