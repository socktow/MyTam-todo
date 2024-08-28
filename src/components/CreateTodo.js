import React, { useState } from "react";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../Redux/Thunk/todosThunk'; // Ensure this path is correct
import buttonAddIcon from "../image/buttonadd.png"; // Ensure this path is correct
import "../App.css"; // Ensure this path is correct

const CreateTodo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.todos); // Adjust according to your Redux slice state

  const handleSubmit = () => {
    if (todo.trim()) {
      dispatch(addTodo(todo)); // Dispatch the addTodo action with the todo text
      setTodo("");
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
        onClick={handleSubmit}
        loading={loading} // Show loading state when the action is being processed
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img src={buttonAddIcon} alt="Add Todo" style={{ width: "24px", height: "24px", marginRight: "5px" }} />
        Add Todo
      </Button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>} {/* Display error message if any */}
    </div>
  );
};

export default CreateTodo;
