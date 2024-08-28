import axios from 'axios';

const baseURL = 'https://mytamdodo-backend.vercel.app/api/tasks';

export const readTodos = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data.map(todo => ({
      id: todo.Id,
      text: todo.TextTask,
      dateTime: new Date(todo.DateTime),
      status: todo.Status
    }));
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

export const createTodo = async (todoText) => {
  try {
    const response = await axios.post(baseURL, {
      TextTask: todoText,
      DateTime: new Date().toISOString(),
      Status: false
    });

    return {
      id: response.data.Id,
      text: response.data.TextTask,
      dateTime: new Date(response.data.DateTime),
      status: response.data.Status
    };
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedFields) => {
  try {
    const response = await axios.patch(`${baseURL}/${id}`, updatedFields);
    return {
      id: response.data.Id, 
      text: response.data.TextTask,
      dateTime: new Date(response.data.DateTime),
      status: response.data.Status
    };
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  if (!id) {
    throw new Error('ID is required to delete a todo');
  }
  try {
    await axios.delete(`${baseURL}/${id}`); 
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};
