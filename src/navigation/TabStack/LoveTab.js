import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Task} from '../../screens';

const LoveStack = createStackNavigator();

const LoveTab = () => (
  <LoveStack.Navigator>
    <LoveStack.Screen name="Love" component={Task} />
  </LoveStack.Navigator>
);

export default LoveTab;
