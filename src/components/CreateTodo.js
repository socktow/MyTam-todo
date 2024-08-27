import React, { useState } from "react";
import { Input, Button } from "antd";
import buttonAddIcon from "../image/buttonadd.png"; // Đường dẫn đến hình ảnh
import "../App.css"; // Import file CSS của bạn
import { createTodo } from '../api/api'; // Import the createTodo function

const CreateTodo = ({ onAdd }) => {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (todo.trim()) {
      setLoading(true);
      setError(null);
      try {
        const newTodo = await createTodo(todo); // Create a new todo via API
        onAdd(newTodo); // Pass the new todo to the parent component
        setTodo("");
      } catch (error) {
        setError('Failed to create new todo'); // Set error message
        console.error('Failed to create new todo', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ marginBottom: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a new todo"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <Button
        type="primary"
        icon={<img src={buttonAddIcon} alt="Add Todo" style={{ width: "24px", height: "24px" }} />}
        onClick={handleSubmit}
        loading={loading}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Add Todo
      </Button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default CreateTodo;
