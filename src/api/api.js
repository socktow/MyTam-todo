import axios from 'axios';

// Base URL for your API
const baseURL = 'https://mytamdodo-backend.vercel.app/api/tasks';

// Read all todos
export const readTodos = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data.map(todo => ({
      id: todo._id,  // MongoDB ObjectId
      text: todo.TextTask,
      dateTime: todo.DateTime,
      status: todo.Status // Include the Status field
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (todoText) => {
    try {
      const response = await axios.post(baseURL, {
        TextTask: todoText,
        DateTime: new Date().toISOString(),
        completed: false, // Make sure to include any necessary fields
      });
      
      // Ensure the response is as expected
      console.log('Create Todo Response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error; // Re-throw the error to be handled by the calling function
    }
  };
  

// Update a todo by ID
export const updateTodo = async (id, updatedFields) => {
  try {
    const response = await axios.patch(`${baseURL}/${id}`, updatedFields);
    return {
      id: response.data._id, // MongoDB ObjectId
      text: response.data.TextTask,
      dateTime: response.data.DateTime,
      status: response.data.Status
    };
  } catch (error) {
    console.error('Failed to update task', error);
    throw error;
  }
};

// Delete a todo by ID
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return {
      id: response.data._id, // MongoDB ObjectId
      text: response.data.TextTask,
      dateTime: response.data.DateTime,
      status: response.data.Status
    };
  } catch (error) {
    console.error('Failed to delete task', error);
    throw error;
  }
};
