import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
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
      <View className="items-center mx-1.5">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedCategory(item.id)}
          onLongPress={drag}
          disabled={isActive} // true while that row is being dragged .
          className={`w-16 h-16 rounded-md items-center justify-center border-2 border-white ${
            isSelected ? 'bg-orange-300' : 'bg-white'
          } ${isActive ? 'opacity-70' : ''}`}
        >
          <Image
            source={item.icon}
            className="w-9 h-9"
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <Text
          className={`text-[10px] text-center mt-1.5 ${
            isSelected ? 'text-white font-bold' : 'text-white'
          }`}
        >
          {item.label}
        </Text>
      </View>
    </ScaleDecorator>
  );
};

  return (
    <GestureHandlerRootView style={{ height: 88 }}>
      <View style={{ height: 88, justifyContent: 'center' }}>
        <DraggableFlatList
          data={categories}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setCategories(data)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default CategoriesList;