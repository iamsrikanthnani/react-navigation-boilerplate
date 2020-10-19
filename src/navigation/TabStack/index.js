import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoveTab from 'navigation/TabStack/LoveTab';
import TaskTab from 'navigation/TabStack/TaskTab';
import ProfileTab from 'navigation/TabStack/ProfileTab';
import ChatTab from 'navigation/TabStack/ChatTab';
import FoodTab from 'navigation/TabStack/FoodTab';
import {APP_FONTS} from 'fonts';
import {COLORS} from 'utils';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTab = createBottomTabNavigator();

const TabStack = () => {
  const {colors} = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Task':
              iconName = 'ios-albums-outline';
              break;
            case 'Love':
              iconName = 'ios-heart-half-outline';
              break;
            case 'Chat':
              iconName = 'ios-chatbubbles-outline';
              break;
            case 'Food':
              iconName = 'ios-fast-food-outline';
              break;
            case 'Profile':
              iconName = 'ios-person-outline';
              break;
            default:
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: {
          fontFamily: APP_FONTS.medium,
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
        activeTintColor: COLORS.primary,
        inactiveTintColor: colors.text,
      }}>
      <BottomTab.Screen name="Task" component={TaskTab} />
      <BottomTab.Screen name="Food" component={FoodTab} />
      <BottomTab.Screen name="Love" component={LoveTab} />
      <BottomTab.Screen name="Chat" component={ChatTab} />
      <BottomTab.Screen name="Profile" component={ProfileTab} />
    </BottomTab.Navigator>
  );
};

export default TabStack;
