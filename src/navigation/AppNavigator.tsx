import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SelectionScreen from '../screens/Selection';

import { ROUTES } from '../constants/navigation';

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
    <Stack.Screen name={ROUTES.SELECTION} component={SelectionScreen} />
  </Stack.Navigator>
);
