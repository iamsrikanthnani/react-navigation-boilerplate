import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from 'screens';
import {FONT_FAMILY} from 'theme/fonts';

const ProfileStack = createStackNavigator();

const ProfileTab = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerTitleStyle: {fontSize: 16, fontFamily: FONT_FAMILY.regular},
    }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

export default ProfileTab;
