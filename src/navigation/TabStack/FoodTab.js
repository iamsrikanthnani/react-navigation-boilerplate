import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Food} from 'screens';
import {APP_FONTS} from 'fonts';

const FoodStack = createStackNavigator();

const FoodTab = () => (
  <FoodStack.Navigator
    screenOptions={{
      headerTitleStyle: {fontSize: 16, fontFamily: APP_FONTS.regular},
    }}>
    <FoodStack.Screen name="Food" component={Food} />
  </FoodStack.Navigator>
);

export default FoodTab;
