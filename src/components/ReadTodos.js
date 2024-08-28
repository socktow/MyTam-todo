import React, { useEffect } from 'react';
import { List, Button, Spin, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, toggleTodo, deleteTodo } from '../Redux/Thunk/todosThunk';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';

const ReadTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);

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

  return (
    <List
      bordered
      dataSource={todos}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key="toggle"
              type={item.status ? "default" : "primary"}
              icon={<CheckOutlined />}
              onClick={() => handleToggle(item.id)}
            >
              {item.status ? 'Undo' : 'Complete'}
            </Button>,
            <Button
              key="delete"
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <span
            style={{
              textDecoration: item.status ? 'line-through' : 'none',
              color: item.status ? '#888' : '#000',
            }}
          >
            {item.text || 'No text available'}
          </span>
        </List.Item>
      )}
    />
  );
};

export default ReadTodos;
