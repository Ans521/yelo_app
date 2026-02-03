// src/components/navigation/AppNavigator.jsx
import React from 'react';
import TabNavigator from './TabNavigator';
import HomeScreen from '../../screens/HomeScreen';
// Import other screens as needed

export default function AppNavigator() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content area */}
      <div className="pb-28">
        <HomeScreen />
        {/* Your screen content here */}
      </div>
      
      {/* Bottom Tab Navigation */}
      <TabNavigator />
    </div>
  );
}
