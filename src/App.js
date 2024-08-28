import React, { useState, useEffect } from 'react';
import { Typography, Divider } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTodo from './components/CreateTodo';
import ReadTodos from './components/ReadTodos';
import { createTodo, readTodos, updateTodo, deleteTodo } from './api/api'; // Import your API functions

const { Title } = Typography;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await readTodos();
        setTodos(todosData);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
        toast.error('Failed to fetch todos');
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodoText) => {
    try {
      await createTodo(newTodoText);
      const todosData = await readTodos();
      setTodos(todosData);
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
        await updateTodo(id, { status: !todoToUpdate.status });
        const todosData = await readTodos();
        setTodos(todosData);
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
      setTodos(todos.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>My Todo List</Title>
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
      />
    </div>
  );
}

export default App;
