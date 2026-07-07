// PrivateRoute.jsx - Wraps pages that require the user to be logged in.
// If there's no valid session, it redirects to the login page.
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
