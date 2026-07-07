// taskRoutes.js
const express = require("express");
const protect = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTopPriorityTasks,
} = require("../controllers/taskController");

const router = express.Router();

// Every route below is protected - user must send a valid JWT
router.use(protect);

// IMPORTANT: specific routes like "/dashboard/top" must come BEFORE "/:id"
// otherwise Express will think "dashboard" is an :id value.
router.get("/dashboard/top", getTopPriorityTasks);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
