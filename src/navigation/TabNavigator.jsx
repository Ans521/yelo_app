import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SubcategoryListScreen from '../screens/SubcategoryListScreen';
import AddListingScreen from '../screens/AddListingScreen';
import GalleryScreen from '../screens/GalleryScreen';
import ListingDetailScreen from '../screens/ListingDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';

const Tab = createBottomTabNavigator();
const AddStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const ORANGE = '#F08E14';
const WHITE = '#ffffff';
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: ORANGE,
    height: 80,
    paddingTop: 8,
    paddingBottom: 20,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    overflow: 'hidden'
  },
  tabBarLabel: {
    fontSize: 12,
  },
  tabBarBg: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
  },

});

export default function TabNavigator() {
  const AddListingStack = () => (
    <AddStack.Navigator screenOptions={{ headerShown: false }}>
      <AddStack.Screen name="AddListingForm" component={AddListingScreen} />
      <AddStack.Screen name="Gallery" component={GalleryScreen} />
      <AddStack.Screen name="ListingDetail" component={ListingDetailScreen} />
    </AddStack.Navigator>
  );

  const CategoryStackScreen = () => (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStack.Screen name="CategoryMain" component={CategoryScreen} />
      <CategoryStack.Screen name="SubcategoryList" component={SubcategoryListScreen} />
    </CategoryStack.Navigator>
  );

  const ProfileStackScreen = () => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
    </ProfileStack.Navigator>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        activeTintColor: '#F08E14',
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.62)',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        safeAreaInsets: { bottom: 0 },
        sceneContainerStyle: {
          backgroundColor: WHITE,
        },  
        // tabBarBackground: () => {return <View style={styles.tabBarBg} />}
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryStackScreen}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="grid-view" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddListing"
        component={AddListingStack}
        options={{
          tabBarLabel: 'Add Listing',
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
