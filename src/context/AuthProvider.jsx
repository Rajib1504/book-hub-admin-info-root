import React, { createContext, useContext, useState, useEffect } from "react";

import toast from "react-hot-toast";
import axiosInstance from "../utils/Axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
     
          const { data } = await axiosInstance.get("/users/profile");
          
          
          if (data.data.role === 'admin') {
             setUser(data.data);
          } else {
             throw new Error("Access denied. Not an admin.");
          }
        } catch (error) {
          console.error("Auth verification failed:", error);
          localStorage.removeItem("adminToken");
          setUser(null);
        }
      }
      setLoading(false);
    };
    verifyAdmin();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", { email, password });
      
      if (data.data.role !== "admin") {
        toast.error("Access denied. Only admins can login.");
        return false;
      }

      localStorage.setItem("adminToken", data.token);
      setUser(data.data);
      toast.success("Welcome back, Admin!");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);