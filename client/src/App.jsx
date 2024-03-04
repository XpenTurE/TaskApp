import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EditTask from "./components/EditTask";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/taskform" element={<TaskForm />} />
          <Route path="/" element={<TaskList />} />
          <Route path="/edit/:taskId" element={<EditTask />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
