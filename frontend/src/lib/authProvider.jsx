import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function initAuth() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/me`,
          { withCredentials: true },
        );
        setUser(response.data);
      } catch (err) {
        setUser(null);
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
