import React, { useState, useEffect } from 'react';
import { Typography, Divider } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTodo from './components/CreateTodo';
import ReadTodos from './components/ReadTodos';
import { createTodo, readTodos, updateTodo, deleteTodo } from './api/api'; // Import your API functions
import './App.css';

const { Title } = Typography;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await readTodos();
        const formattedTodos = todosData.map(todo => ({
          id: todo.Id,
          text: todo.TextTask,
          dateTime: todo.DateTime,
          completed: todo.Status || false, // Adjust according to your data
        }));
        setTodos(formattedTodos);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodoText) => {
    try {
      if (typeof newTodoText !== 'string' || !newTodoText.trim()) {
        toast.error('Invalid todo text');
        return;
      }

      await createTodo(newTodoText);
      
      const todosData = await readTodos();
      const formattedTodos = todosData.map(todo => ({
        id: todo.Id,
        text: todo.TextTask,
        dateTime: todo.DateTime,
        completed: todo.Status || false,
      }));
      setTodos(formattedTodos);

      toast.success('Todo added successfully!');
    } catch (error) {
      console.error('Failed to add todo:', error);
      toast.error('Failed to add todo');
    }
  };

  const handleToggleTodoCompletion = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        await updateTodo(id, { completed: !todoToUpdate.completed });
        
        const todosData = await readTodos();
        const formattedTodos = todosData.map(todo => ({
          id: todo.Id,
          text: todo.TextTask,
          dateTime: todo.DateTime,
          completed: todo.Status || false,
        }));
        setTodos(formattedTodos);

        toast.success('Todo updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
      toast.error('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      
      const todosData = await readTodos();
      const formattedTodos = todosData.map(todo => ({
        id: todo.Id,
        text: todo.TextTask,
        dateTime: todo.DateTime,
        completed: todo.Status || false,
      }));
      setTodos(formattedTodos);

      toast.success('Todo deleted successfully!');
    } catch (error) {
      console.error('Failed to delete todo:', error);
      toast.error('Failed to delete todo');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'TitleFont' }}>
      <Title level={2} style={{ textAlign: 'center', fontFamily: 'TitleFont' }}>My Todo List</Title>
      <CreateTodo onAdd={handleAddTodo} />
      <Divider />
      <ReadTodos
        todos={todos}
        onToggle={handleToggleTodoCompletion}
        onDelete={handleDeleteTodo}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
