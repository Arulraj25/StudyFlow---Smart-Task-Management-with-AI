// priority.js - Calculates an "urgency/priority score" for a task
// Formula factors in: how many days are left, how important (weight) the task is,
// and how much of it is already completed.

function calculatePriorityScore(task) {
  const now = new Date();
  const due = new Date(task.dueDate);

  // Milliseconds remaining until due date, converted to days
  const msLeft = due.getTime() - now.getTime();
  let daysLeft = msLeft / (1000 * 60 * 60 * 24);

  // Clamp to a small positive minimum so we never divide by zero
  // (also treats overdue tasks as maximally urgent)
  if (daysLeft < 0.1) daysLeft = 0.1;

  const weight = task.weight || 5; // 1-10 scale
  const completionPercent = task.completionPercent || 0; // 0-100
  const remainingWork = 100 - completionPercent; // higher = more left to do

  // 1) Urgency: grows sharply as daysLeft shrinks (inverse relationship)
  const urgencyScore = (1 / daysLeft) * 100;

  // 2) Weight: scale 1-10 up to a 0-100 range
  const weightScore = weight * 10;

  // 3) Completion factor: tasks with more remaining work get a slight boost
  const completionScore = remainingWork; // already 0-100

  // Weighted sum - tweak these multipliers to change what matters most.
  // Urgency matters most, then importance, then how much work remains.
  const priorityScore =
    urgencyScore * 0.5 + weightScore * 0.35 + completionScore * 0.15;

  // Round to 2 decimal places for clean display
  return Math.round(priorityScore * 100) / 100;
}

module.exports = calculatePriorityScore;
