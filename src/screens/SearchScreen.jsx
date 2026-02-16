import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center" edges={['top', 'left', 'right']}>
      <Text className="text-gray-600">Search Screen</Text>
    </SafeAreaView>
  );
}
