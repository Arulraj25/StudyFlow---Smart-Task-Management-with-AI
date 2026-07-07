// aiRoutes.js
const express = require("express");
const protect = require("../middleware/auth");
const { breakdownTask } = require("../controllers/aiController");

const router = express.Router();

router.use(protect);

// POST /api/ai/breakdown/:taskId - generate subtasks for an existing task
router.post("/breakdown/:taskId", breakdownTask);

module.exports = router;
