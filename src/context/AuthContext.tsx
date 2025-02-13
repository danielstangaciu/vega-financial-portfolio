import React, { createContext, useState, useEffect } from "react";

// Define the type for our auth context
interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Create the AuthContext with a default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to track logged-in user
  const [user, setUser] = useState<string | null>(null);

  // Check localStorage for auth data on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to handle login
  const login = (username: string, password: string) => {
    // Simple validation
    if (username === "admin" && password === "password") {
      localStorage.setItem("user", username);
      setUser(username);
      return true;
    }
    return false;
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// We create an AuthContext to store user authentication state.
// The AuthProvider component wraps our app and manages authentication state.
// useEffect checks localStorage on app load to keep users logged in.
// The login function checks credentials and stores the user in localStorage.
// The logout function removes the user from localStorage and resets state.