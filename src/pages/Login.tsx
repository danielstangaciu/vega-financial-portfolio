import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

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
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-background to-primary">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-96 border border-white/20">
        <h2 className="text-center text-2xl font-semibold text-white">Welcome Back</h2>
        <p className="text-center text-sm text-gray-300 mb-6">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Button type="submit" variant="accent" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
