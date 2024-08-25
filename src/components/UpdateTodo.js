import React, { useState } from 'react';
import { Input, Button } from 'antd';

const UpdateTodo = ({ todo, onUpdate }) => {
  const [newText, setNewText] = useState(todo.text);

  const handleUpdate = () => {
    if (newText.trim()) {
      onUpdate(newText);
    }
  };

  return (
    <div>
      <Input
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <Button type="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default UpdateTodo;
