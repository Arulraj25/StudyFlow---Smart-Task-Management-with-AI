// taskController.js - CRUD logic for tasks + priority sorting
const Task = require("../models/Task");
const calculatePriorityScore = require("../utils/priority");

// @route  POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, subject, description, dueDate, weight } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and due date are required" });
    }

    const task = await Task.create({
      user: req.userId, // comes from auth middleware
      title,
      subject,
      description,
      dueDate,
      weight,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

// @route  GET /api/tasks
// Returns ALL of the logged-in user's tasks, each annotated with a priorityScore,
// sorted so the highest priority task comes first.
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });

    // Attach a computed priorityScore to each task (not stored in DB,
    // calculated fresh every time since "days left" changes daily)
    const tasksWithPriority = tasks.map((task) => ({
      ...task.toObject(),
      priorityScore: calculatePriorityScore(task),
    }));

    // Sort descending - highest priority score first
    tasksWithPriority.sort((a, b) => b.priorityScore - a.priorityScore);

    res.json(tasksWithPriority);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

// @route  GET /api/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error: error.message });
  }
};

// @route  PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // ensures users can only edit their OWN tasks
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

// @route  DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};

// @route  GET /api/tasks/dashboard/top
// Returns today's top 3 priority tasks (excludes completed tasks)
const getTopPriorityTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.userId,
      status: { $ne: "completed" },
    });

    const withPriority = tasks.map((task) => ({
      ...task.toObject(),
      priorityScore: calculatePriorityScore(task),
    }));

    withPriority.sort((a, b) => b.priorityScore - a.priorityScore);

    res.json(withPriority.slice(0, 3)); // just the top 3
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard tasks", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTopPriorityTasks,
};
