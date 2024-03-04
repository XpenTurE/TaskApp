import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; 
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/task', { title, description })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => { 
        console.error('Error creating/updating task:', error);
      });
      navigate("/")
  };

    return (
    <div className="form-container">
      <h2>Task Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Title:</label>
          <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Description:</label>
          <input className="input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
