const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors());
require("dotenv").config();

const mongo_cred = process.env.MONGO_CRED;

mongoose.connect(mongo_cred, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error connecting to database:", err);
});

db.once("open", () => {
  console.log("Connected to the database");
});

const Task = mongoose.model("Task", {
  title: String,
  description: String,
  status: String,
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
app.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: "To Do",
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: "Task not found" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
