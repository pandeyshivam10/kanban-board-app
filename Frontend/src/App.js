import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import AddTaskForm from "./components/AddTaskForm";
import axios from "axios";
import NavBar from "./components/NavBar";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await api.post("/tasks", newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async (editedTask) => {
    try {
      const response = await api.put(`/tasks/${editedTask._id}`, editedTask);
      const updatedTasks = tasks.map((task) =>
        task._id === response.data._id ? response.data : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8">
        <AddTaskForm onAdd={handleAddTask} />
        <KanbanBoard
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default App;
