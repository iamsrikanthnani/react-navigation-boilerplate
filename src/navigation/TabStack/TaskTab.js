import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Task} from 'screens';
import {APP_FONTS} from 'fonts';

const TaskStack = createStackNavigator();

const TaskTab = () => {
  return (
    <TaskStack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 16, fontFamily: APP_FONTS.regular},
      }}>
      <TaskStack.Screen name="Task" component={Task} />
    </TaskStack.Navigator>
  );
};

export default TaskTab;
