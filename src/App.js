import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GetStarted from './Components/GetStarted';
import AssignTaskPage from './Components/AssignTaskPage';
import TaskHomePage from './Components/TaskHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<TaskHomePage />} />
        <Route path="/teams" element={<AssignTaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;