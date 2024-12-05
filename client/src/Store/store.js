import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../Features/UserSlice";
import taskReducer from "../Features/TaskSlice";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: taskReducer,
  },
});
