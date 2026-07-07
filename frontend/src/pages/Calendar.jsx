// Calendar.jsx - Simple monthly calendar view showing tasks on their due dates
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getTasks } from "../api/api";

export default function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to load tasks", err));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Build a grid of day numbers for the current month, aligned to weekdays
  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = firstDayOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  // Empty cells before the 1st of the month
  for (let i = 0; i < startWeekday; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  // Group tasks by their due date's day-of-month (only for the currently viewed month/year)
  const tasksByDay = {};
  tasks.forEach((task) => {
    const due = new Date(task.dueDate);
    if (due.getFullYear() === year && due.getMonth() === month) {
      const day = due.getDate();
      if (!tasksByDay[day]) tasksByDay[day] = [];
      tasksByDay[day].push(task);
    }
  });

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {monthName} {year}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={goToPrevMonth}
              className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              ← Prev
            </button>
            <button
              onClick={goToNextMonth}
              className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Weekday header row */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-400 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarCells.map((day, i) => (
            <div
              key={i}
              className={`min-h-[90px] rounded-lg border p-2 text-left ${
                day === null
                  ? "border-transparent"
                  : isToday(day)
                  ? "border-primary-400 bg-primary-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {day && (
                <>
                  <div className="text-xs font-semibold text-gray-500 mb-1">{day}</div>
                  <div className="space-y-1">
                    {(tasksByDay[day] || []).slice(0, 3).map((task) => (
                      <div
                        key={task._id}
                        title={task.title}
                        className="text-[10px] bg-primary-100 text-primary-700 rounded px-1 py-0.5 truncate"
                      >
                        {task.title}
                      </div>
                    ))}
                    {(tasksByDay[day] || []).length > 3 && (
                      <div className="text-[10px] text-gray-400">
                        +{tasksByDay[day].length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
