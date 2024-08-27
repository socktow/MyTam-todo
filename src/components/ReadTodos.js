import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import completeIcon from '../image/complete.png'; // Image path
import { readTodos, updateTodo, deleteTodo } from '../api/api'; // Import the API functions
import './ReadTodos.css'; // Import CSS

// Import background images
import image1 from '../image/city/1.jpg';
import image2 from '../image/city/2.jpg';
import image3 from '../image/city/3.jpg';
import image4 from '../image/city/4.png';

const ReadTodos = ({ onToggle, onDelete }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await readTodos();
        // Map through the data to extract the relevant fields
        const formattedTodos = todosData.map(todo => ({
          id: todo.id,  // Use `id` for consistency
          text: todo.text,
          dateTime: todo.dateTime,
          completed: todo.status || false, // Use `status` for the completion state
        }));
        setTodos(formattedTodos);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    fetchTodos();
  }, []);

  const handleToggle = async (id) => {
    try {
      const currentTodo = todos.find(todo => todo.id === id);
      const updatedTodo = await updateTodo(id, { status: !currentTodo.completed });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      onToggle(id);
    } catch (error) {
      console.error('Failed to toggle todo completion', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      onDelete(id);
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  // Array of background images
  const backgroundImages = [
    `url(${image1})`,
    `url(${image2})`,
    `url(${image3})`,
    `url(${image4})`,
  ];

  return (
    <List
      bordered
      dataSource={todos}
      renderItem={(item, index) => (
        <List.Item
          className="list-item"
          style={{
            backgroundImage: backgroundImages[index % backgroundImages.length], // Cycle through background images
            backgroundSize: 'cover', // Ensure the image covers the entire item
            backgroundPosition: 'center', // Center the background image
          }}
        >
          <div className="task-container">
            <span className={item.completed ? 'task-text task-completed' : 'task-text'}>
              {item.text}
            </span>
          </div>
          <div className="actions">
            <div 
              className="complete-button" 
              onClick={() => handleToggle(item.id)}
            >
              <img
                src={completeIcon}
                alt={item.completed ? 'Undo' : 'Complete'}
                className="complete-icon"
              />
              <span className="complete-text">
                {item.completed ? 'Undo' : 'Complete'}
              </span>
            </div>
            <div
              className="delete-button" 
              onClick={() => handleDelete(item.id)}
            >
              <img
                src={completeIcon}
                alt="Delete"
                className="delete-icon"
              />
              <span className="delete-text">
                Delete
              </span>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default ReadTodos;
