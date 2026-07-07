// Tasks.jsx - Full task list (CRUD), sorted by priority score
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { getTasks, deleteTask as deleteTaskApi } from "../api/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTaskApi(id);
      loadTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // Filter tasks by status for the tab buttons above the list
  const filteredTasks =
    filterStatus === "all" ? tasks : tasks.filter((t) => t.status === filterStatus);

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>
            <p className="text-gray-500 mt-1">Sorted by priority score (highest first)</p>
          </div>
          <button
            onClick={handleNewTask}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
          >
            + New Task
          </button>
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-2 mt-4">
          {["all", "pending", "in-progress", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-sm px-3 py-1.5 rounded-lg font-medium capitalize ${
                filterStatus === s
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : filteredTasks.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <p className="text-gray-500">No tasks here yet. Create your first one!</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRefresh={loadTasks}
              />
            ))
          )}
        </div>
      </main>

      {showForm && (
        <TaskForm
          existingTask={editingTask}
          onClose={() => setShowForm(false)}
          onSaved={loadTasks}
        />
      )}
    </div>
  );
}
