import React, { useState } from 'react';
import { Typography, Divider } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTodo from './components/CreateTodo';
import ReadTodos from './components/ReadTodos';
import './App.css';
const { Title } = Typography;

function App() {
  const [todos, setTodos] = useState([
    { text: 'Xem Tiktok Sáng', completed: false },
    { text: 'Xem Tiktok Chiều', completed: false },
    { text: 'Check Noti Fb Sáng', completed: false },
    { text: 'Check Noti Fb Chiều', completed: false },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const toggleTodoCompletion = (index) => {
    const newTodos = todos.map((item, i) => {
      if (i === index) {
        // Nếu task được hoàn thành, hiển thị thông báo
        if (!item.completed) {
          toast.success(`${item.text} completed!`);
        }
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' , fontFamily: 'TitleFont' }}>
      <Title level={2} style={{ textAlign: 'center' , fontFamily: 'TitleFont'}}>My Todo List</Title>
      <CreateTodo onAdd={addTodo} />
      <Divider />
      <ReadTodos todos={todos} onToggle={toggleTodoCompletion} onDelete={deleteTodo} />
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
