import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Food} from 'screens';
import {FONT_FAMILY} from 'theme/fonts';

const FoodStack = createStackNavigator();

const FoodTab = () => (
  <FoodStack.Navigator
    screenOptions={{
      headerTitleStyle: {fontSize: 16, fontFamily: FONT_FAMILY.regular},
    }}>
    <FoodStack.Screen name="Food" component={Food} />
  </FoodStack.Navigator>
);

export default FoodTab;
