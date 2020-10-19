import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Love} from 'screens';
import {APP_FONTS} from 'fonts';

const LoveStack = createStackNavigator();

const LoveTab = () => {
  return (
    <LoveStack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 16, fontFamily: APP_FONTS.regular},
      }}>
      <LoveStack.Screen name="Love" component={Love} />
    </LoveStack.Navigator>
  );
};

export default LoveTab;
