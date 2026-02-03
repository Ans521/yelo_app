import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

/**
 * TAB NAVIGATION GUIDE
 * -------------------
 * 1. SWITCHING TABS (user taps a tab):
 *    - Just tap the tab bar icon/label. The navigator handles it.
 *
 * 2. SWITCHING TABS FROM CODE (e.g. from a button inside HomeScreen):
 *    - Get the tab navigator:  navigation.getParent()
 *    - Navigate to a tab:       navigation.getParent().navigate('Search')
 *    - Or use the tab name:     navigation.navigate('Profile')
 *    - Tab names are: 'Home' | 'Search' | 'Profile'
 *
 * 3. EXAMPLE – from HomeScreen, "BOOK NOW" could open Profile tab:
 *    const navigation = useNavigation();
 *    onPress={() => navigation.navigate('Profile')}
 *
 * 4. ADD A NEW TAB: Add a new <Tab.Screen name="..." component={...} /> below.
 */
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: { paddingBottom: 6, paddingTop: 8, height: 56 },
        tabBarLabelStyle: { fontSize: 12 },
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
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
