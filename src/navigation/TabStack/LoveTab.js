import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Love} from 'screens';
import {FONT_FAMILY} from 'theme/fonts';

const LoveStack = createStackNavigator();

const LoveTab = () => {
  return (
    <LoveStack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 16, fontFamily: FONT_FAMILY.regular},
      }}>
      <LoveStack.Screen name="Love" component={Love} />
    </LoveStack.Navigator>
  );
};

export default LoveTab;
