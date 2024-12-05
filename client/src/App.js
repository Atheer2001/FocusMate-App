import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// استيراد الصفحات
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask";
import Home from "./Components/Home";
import IndexPage from "./Components/IndexPage";
import Login from "./Components/Login";
import Tasks from "./Components/Tasks";
import Register from "./Components/Register";
import TaskDetails from "./Components/TaskDetails";
import About from "./Components/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/task-details/:taskId" element={<TaskDetails />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
