// Dashboard.jsx - Shows today's top 3 priority tasks
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { getTopTasks } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadTopTasks = async () => {
    setLoading(true);
    try {
      const res = await getTopTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load dashboard tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here are your top 3 priority tasks for today.
        </p>

        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : tasks.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <p className="text-gray-500">
                No pending tasks! Add some tasks on the Tasks page to see your
                priorities here.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => {}}
                onDelete={() => {}}
                onRefresh={loadTopTasks}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
