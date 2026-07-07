// TaskCard.jsx - Displays a single task with its priority score, and action buttons
import { useState } from "react";
import { breakdownTask } from "../api/api";

// Helper to pick a color based on how urgent the priority score is
function getPriorityColor(score) {
  if (score >= 60) return "bg-red-100 text-red-700 border-red-200";
  if (score >= 35) return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-green-100 text-green-700 border-green-200";
}

export default function TaskCard({ task, onEdit, onDelete, onRefresh }) {
  const [loadingAI, setLoadingAI] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const daysLeft = Math.ceil(
    (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  // Calls the backend to trigger the Gemini AI subtask breakdown
  const handleAIBreakdown = async () => {
    setLoadingAI(true);
    try {
      await breakdownTask(task._id);
      setShowSubtasks(true);
      onRefresh(); // reload tasks so we see the new subtasks
    } catch (err) {
      alert(err.response?.data?.message || "AI breakdown failed");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.subject}</p>
        </div>
        {task.priorityScore !== undefined && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getPriorityColor(
              task.priorityScore
            )}`}
          >
            Priority: {task.priorityScore}
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mt-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
        <span>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        <span>⏳ {daysLeft >= 0 ? `${daysLeft} days left` : "Overdue!"}</span>
        <span>⚖️ Weight: {task.weight}/10</span>
        <span>✅ {task.completionPercent}% done</span>
        <span className="capitalize">📌 {task.status}</span>
      </div>

      {/* Subtasks list (from Gemini AI breakdown) */}
      {task.subtasks?.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowSubtasks(!showSubtasks)}
            className="text-xs text-primary-600 font-medium"
          >
            {showSubtasks ? "Hide" : "Show"} subtasks ({task.subtasks.length})
          </button>
          {showSubtasks && (
            <ul className="mt-2 space-y-1 pl-4 list-disc text-sm text-gray-600">
              {task.subtasks.map((st, i) => (
                <li key={i}>
                  {st.title}{" "}
                  {st.deadline && (
                    <span className="text-gray-400">
                      (by {new Date(st.deadline).toLocaleDateString()})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleAIBreakdown}
          disabled={loadingAI}
          className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg font-medium hover:bg-primary-100 disabled:opacity-50"
        >
          {loadingAI ? "Generating..." : "✨ AI Breakdown"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
