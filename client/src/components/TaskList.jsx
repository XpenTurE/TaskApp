import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/task')
      .then(response => {
        setTasks(response.data.tasks);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleUpdate = (taskId) => {
    window.location.href = `/edit/${taskId}`;
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/task/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="list-container">
      <h2>Task List</h2>
      <Link to="/taskform">
        <button className="add-task-button">Add Task</button>
      </Link>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="list-item">
            {task.title} - {task.description}
            <div className="list-item-buttons">
              <button onClick={() => handleUpdate(task._id)} className="update-button">Update</button>
              <button onClick={() => handleDelete(task._id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
