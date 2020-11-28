import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';

const taskAdapter = createEntityAdapter();

const taskSlice = createSlice({
  name: 'task',
  initialState: taskAdapter.getInitialState(),
  reducers: {
    taskAddOne: taskAdapter.addOne,
    taskAddMany: taskAdapter.addMany,
    taskUpdate: taskAdapter.updateOne,
    taskRemove: taskAdapter.removeOne,
  },
});

export const {actions, reducer: taskReducer} = taskSlice;
export const selectors = taskAdapter.getSelectors((state) => state.task);

export default taskReducer;
