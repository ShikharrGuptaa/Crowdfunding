import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {logoutUser} from "../services/api"  // Import the logoutUser function

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await logoutUser(); // Call the logoutUser function
      Cookies.remove("token"); // Remove the token cookie
      setIsLoggedIn(false); // Update the login state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
