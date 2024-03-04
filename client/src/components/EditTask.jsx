import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./TaskForm.css"

const EditTask = () => {
  const { taskId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/task/${taskId}`)
      .then(response => {
        const task = response.data.response;
        setTitle(task.title);
        setDescription(task.description);
      })
      .catch(error => {
        console.error('Error fetching task details:', error);
      });
  }, [taskId]);

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost:3000/task/${taskId}`, { title, description });
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Task</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
      </label>
      <br />
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="input" /> 
      </label>
      <br />
      <button onClick={handleUpdate} className="button">Update Task</button> 
    </div>
  );
};

export default EditTask;
