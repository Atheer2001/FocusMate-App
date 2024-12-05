import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch tasks from the database
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getTasks`); // API endpoint to get tasks
      const tasks = response.data.tasks;
      return tasks;
    } catch (error) {
      return error.message;
    }
  }
);

// Async thunk to create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/createTask`, taskData); // API endpoint to create task
      return response.data.task; // Return the newly created task
    } catch (error) {
      return error.message;
    }
  }
);

// Async thunk to update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedData }) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}updateTask/${taskId}`, updatedData); // API endpoint to update task
      return response.data.task; // Return the updated task
    } catch (error) {
      return error.message;
    }
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}deleteTask/${taskId}`); // API endpoint to delete task
      return taskId; // Return taskId to delete it from the state
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  tasks: [], // Store tasks here
  isLoading: false, // Loading state for tasks
  isError: false, // Error state for tasks
  msg: null, // Store error or success message
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching tasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload; // Store the fetched tasks
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      })
      // Creating a new task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload); // Add the new task to the tasks array
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      })
      // Deleting a task
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(task => task._id !== action.payload); // Remove the deleted task from the state
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      });
  },
});

export default taskSlice.reducer;
