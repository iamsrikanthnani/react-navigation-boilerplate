import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Task} from '../../screens';

const TaskStack = createStackNavigator();

const TaskTab = () => (
  <TaskStack.Navigator>
    <TaskStack.Screen name="Task" component={Task} />
  </TaskStack.Navigator>
);

export default TaskTab;
