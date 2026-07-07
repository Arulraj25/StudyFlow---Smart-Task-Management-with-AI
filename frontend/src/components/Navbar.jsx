// Navbar.jsx - Top navigation bar shown on all logged-in pages
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <Link to="/" className="text-xl font-bold text-primary-600">
        📚 StudyFlow
      </Link>

      {isAuthenticated && (
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">
            Dashboard
          </Link>
          <Link to="/tasks" className="text-gray-600 hover:text-primary-600 font-medium">
            Tasks
          </Link>
          <Link to="/calendar" className="text-gray-600 hover:text-primary-600 font-medium">
            Calendar
          </Link>
          <span className="text-sm text-gray-400">Hi, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
