import React from 'react';
import { List } from 'antd';
import completeIcon from '../image/complete.png'; // Đường dẫn đến hình ảnh
import './ReadTodos.css'; // Import tệp CSS

// Import các hình nền
import image1 from '../image/city/1.jpg';
import image2 from '../image/city/2.jpg';
import image3 from '../image/city/3.jpg';
import image4 from '../image/city/4.png';

const ReadTodos = ({ todos, onToggle, onDelete }) => {
  // Tạo mảng các hình nền
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
            backgroundImage: backgroundImages[index % backgroundImages.length], // Lặp lại hình nền
          }}
        >
          <div className="background-box"></div> {/* Lớp màu đen trên nền */}
          <div className="task-container">
            <span className={item.completed ? 'task-text task-completed' : 'task-text'}>
              {item.text}
            </span>
          </div>
          <div className="actions">
            <div 
              className="complete-button" 
              onClick={() => onToggle(index)}
            >
              <img
                src={completeIcon}
                alt="Complete"
                className="complete-icon"
              />
              <span className="complete-text">
                {item.completed ? 'Undo' : 'Complete'}
              </span>
            </div>
            {/* <div
              className="delete-button" 
              onClick={() => onDelete(index)}
            >
              <img
                src={completeIcon}
                alt="Delete"
                className="delete-icon"
              />
              <span className="delete-text">
                Delete
              </span>
            </div> */}
          </div>
        </List.Item>
      )}
    />
  );
};

export default ReadTodos;
