import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import TaskModel from "./Models/TaskModel.js"; // نموذج المهام
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB URI
const URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@focusmatecluster.snjys.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=FocusMateCluster`;

mongoose.connect(URI)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});

// User Registration
app.post("/registerUser", async (req, res) => {
  try {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    res.send({ user, msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    res.send({ user, msg: "Authentication successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// User Logout
app.post("/logout", (req, res) => {
  res.send({ msg: "Logout successful" });
});

// Create a Task
app.post("/createTask", async (req, res) => {
  try {
    const task = new TaskModel({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed || false,
    });

    await task.save();
    res.send({ task, msg: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Fetch All Tasks
app.get("/getTasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.send({ tasks, msg: "Tasks fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Update a Task
app.put("/updateTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedData = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updatedData, {
      new: true, // Return the updated document
    });

    if (!updatedTask) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.send({ task: updatedTask, msg: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Delete a Task
app.delete("/deleteTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.send({ taskId, msg: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

