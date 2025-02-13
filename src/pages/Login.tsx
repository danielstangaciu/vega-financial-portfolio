import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card"; // ✅ Importing reusable Card component

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (auth?.login(username, password)) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials! Try admin/password.");
    }
  };

  return (
    <div className="relative flex h-screen justify-center items-center bg-gradient-to-br from-[#0D1B2A] to-[#1B263B] overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>

      {/* ✅ Reusable Card Component */}
      <Card className="w-96 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h2 className="text-center text-3xl font-bold text-white tracking-wide">Welcome Back</h2>
        <p className="text-center text-sm text-gray-300 mb-6">Sign in to access your dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-400"
            />
          </div>

          {/* ✅ Uses the Button Component */}
          <Button type="submit" variant="accent" className="w-full py-3 text-lg font-semibold">
            Login
          </Button>
        </form>

        {/* Forgot Password / Sign Up Links */}
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Forgot password? <a href="#" className="text-accent hover:underline">Reset</a>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Don't have an account? <a href="#" className="text-accent hover:underline">Sign up</a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
