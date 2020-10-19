import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from 'screens';
import {APP_FONTS} from 'fonts';

const ProfileStack = createStackNavigator();

const ProfileTab = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerTitleStyle: {fontSize: 16, fontFamily: APP_FONTS.regular},
    }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

export default ProfileTab;
