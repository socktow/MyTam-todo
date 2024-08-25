import React, { useState } from "react";
import { Input } from "antd";
import buttonAddIcon from "../image/buttonadd.png"; // Đường dẫn đến hình ảnh
import "../App.css"; // Import file CSS của bạn

const CreateTodo = ({ onAdd }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = () => {
    if (todo.trim()) {
      onAdd(todo);
      setTodo("");
    }
  };

  return (
    <div
      style={{ marginBottom: "50px", display: "flex", alignItems: "center" , justifyContent: "center"}}
    >
      <Input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a new todo"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <div
        style={{
          position: "relative",
          display: "inline-block",
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        <img
          src={buttonAddIcon}
          alt="Add Todo"
          style={{ width: "150px", height: "32px" }}
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#137acd",
            fontWeight: "bold",
            fontSize: "14px",
            fontFamily: "TextFont",
          }}
        >
          Add Todo
        </span>
      </div>
    </div>
  );
};

export default CreateTodo;
