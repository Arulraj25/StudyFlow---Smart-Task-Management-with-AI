// AuthContext.jsx - Provides login state (user + token) to the entire app
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Try to load any existing session from localStorage on first load
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("studyflow_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("studyflow_token"));

  // Whenever user/token change, keep localStorage in sync
  useEffect(() => {
    if (token) {
      localStorage.setItem("studyflow_token", token);
    } else {
      localStorage.removeItem("studyflow_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("studyflow_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("studyflow_user");
    }
  }, [user]);

  // Called after a successful login/signup API response
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
  };

  // Clears session and logs the user out
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook so components can do `const { user, login, logout } = useAuth()`
export function useAuth() {
  return useContext(AuthContext);
}
