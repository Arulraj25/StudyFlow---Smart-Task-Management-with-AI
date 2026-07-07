// aiController.js - Handles the "AI subtask breakdown" feature
const Task = require("../models/Task");
const { generateSubtasks } = require("../utils/gemini");

// @route  POST /api/ai/breakdown/:taskId
// Takes an existing task, sends its description to Gemini, and saves the
// returned subtasks onto that task.
const breakdownTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Use the task's description (fallback to title if description is empty)
    const description = task.description || task.title;

    const subtasks = await generateSubtasks(description, task.dueDate.toISOString());

    // Map Gemini's raw output into the shape our schema expects
    task.subtasks = subtasks.map((st) => ({
      title: st.title,
      deadline: new Date(st.deadline),
      done: false,
    }));

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "AI breakdown failed", error: error.message });
  }
};

module.exports = { breakdownTask };
