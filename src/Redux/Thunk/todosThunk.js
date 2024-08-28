import { createAsyncThunk } from '@reduxjs/toolkit';
import { readTodos, createTodo, updateTodo, deleteTodo as deleteTodoAPI } from '../../api/api';

// Fetch Todos Thunk
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await readTodos();
    return response; // Assuming response is already in the correct format
  } catch (error) {
    // Handle the error if needed
    throw error;
  }
});

// Add Todo Thunk
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todoText, { rejectWithValue }) => {
    try {
      const newTodo = await createTodo(todoText);
      return newTodo;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add todo');
    }
  }
);

// Toggle Todo Thunk
export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const todo = state.todos.todos.find((todo) => todo.id === id);

    if (!todo) {
      return rejectWithValue('Todo not found');
    }

    try {
      const updatedTodo = await updateTodo(id, { Status: !todo.status });
      return updatedTodo;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to toggle todo');
    }
  }
);

// Delete Todo Thunk
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTodoAPI(id);
      return id; // Return the ID of the deleted todo
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete todo');
    }
  }
);
