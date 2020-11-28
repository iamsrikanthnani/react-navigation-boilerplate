import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Task} from 'screens';
import {FONT_FAMILY} from 'theme/fonts';

const TaskStack = createStackNavigator();

const TaskTab = () => {
  return (
    <TaskStack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 16, fontFamily: FONT_FAMILY.regular},
      }}>
      <TaskStack.Screen name="Task" component={Task} />
    </TaskStack.Navigator>
  );
};

export default TaskTab;
