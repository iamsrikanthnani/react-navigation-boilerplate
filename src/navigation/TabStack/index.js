import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoveTab from './LoveTab';
import TaskTab from './TaskTab';

const BottomTab = createBottomTabNavigator();

const TabStack = () => (
  <BottomTab.Navigator>
    <BottomTab.Screen name="Task" component={TaskTab} />
    <BottomTab.Screen name="Love" component={LoveTab} />
  </BottomTab.Navigator>
);

export default TabStack;
