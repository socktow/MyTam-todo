import React, { useEffect, useState } from 'react';
import { List, Button, Spin, Alert, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, toggleTodo, deleteTodo } from '../Redux/Thunk/todosThunk';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const DateTimeBox = ({ dateTime }) => (
  <div style={{ 
    backgroundColor: 'transparent', // Transparent background
    color: '#000', 
    padding: '5px', 
    borderRadius: '3px',
    textAlign: 'center', // Center the text
    width: '100%', // Full width of the task box
  }}>
    {new Date(dateTime).toLocaleDateString()} - {new Date(dateTime).toLocaleTimeString()}
  </div>
);

const ReadTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteTodo(id));
    } else {
      console.error('Invalid ID');
    }
  };

  if (status === 'loading') {
    return <Spin tip="Loading..." />;
  }

  if (status === 'failed') {
    return <Alert message="Failed to load todos." type="error" showIcon />;
  }

  const filteredTodos = todos
    .filter((todo) => (activeTab === '1' ? !todo.status : todo.status))
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // Sort by most recent

  return (
    <div style={{ padding: '10px' }}>
      <Tabs defaultActiveKey="1" onChange={setActiveTab}>
        <TabPane tab="Uncompleted" key="1">
          <TaskList todos={filteredTodos} handleToggle={handleToggle} handleDelete={handleDelete} />
        </TabPane>
        <TabPane tab="Completed" key="2">
          <TaskList todos={filteredTodos} handleToggle={handleToggle} handleDelete={handleDelete} />
        </TabPane>
      </Tabs>
    </div>
  );
};

const TaskList = ({ todos, handleToggle, handleDelete }) => (
  <div>
    {todos.map((item) => (
      <div
        key={item.id}
        style={{ 
          backgroundColor: 'transparent', // Transparent background
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px', // Adds space between each task
          color: '#000',
          boxSizing: 'border-box',
          textAlign: 'center', // Center the entire content
          border: '1px solid #ddd', // Optional: Add a border to each task for better separation
          fontFamily: 'textFont', // Ensure this path is correct
        }}
      >
        <DateTimeBox dateTime={item.dateTime} />
        <div style={{ flexDirection: 'column', alignItems: 'center' }}>
          <span
            style={{
              textDecoration: item.status ? 'line-through' : 'none',
              color: item.status ? '#888' : '#000',
              margin: '10px 0', // Adjust margin for better spacing
            }}
          >
            {item.text || 'No text available'}
          </span>
          <div>
            <Button
              key="toggle"
              type={item.status ? "default" : "primary"}
              icon={<CheckOutlined />}
              onClick={() => handleToggle(item.id)}
              style={{ marginBottom: '5px' , marginTop: '25px'}} // Ensure spacing between buttons
            >
              {item.status ? 'Undo' : 'Complete'}
            </Button>
            <Button
              key="delete"
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ReadTodos;
