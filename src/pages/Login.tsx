import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

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
    <div className="login-container">
      {/* Floating Decorative Elements */}
      <div className="login-decor login-decor-top"></div>
      <div className="login-decor login-decor-bottom"></div>

      {/* Reusable Card Component */}
      <Card className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to access your dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="login-input-group">
            <label className="login-label">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          {/* Uses the Button Component */}
          <Button type="submit" variant="accent" className="w-full py-3 text-lg font-semibold">
            Login
          </Button>
        </form>

        {/* Forgot Password / Sign Up Links */}
        <div className="login-footer">
          <p className="text-gray-400 text-sm">
            Forgot password? <a href="#" className="login-link">Reset</a>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Don't have an account? <a href="#" className="login-link">Sign up</a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
