import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Chat} from 'screens';
import {APP_FONTS} from 'fonts';

const ChatStack = createStackNavigator();

const ChatTab = () => (
  <ChatStack.Navigator
    screenOptions={{
      headerTitleStyle: {fontSize: 16, fontFamily: APP_FONTS.regular},
    }}>
    <ChatStack.Screen name="Chat" component={Chat} />
  </ChatStack.Navigator>
);

export default ChatTab;
