import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { Aboutus, Footer } from "../LandingPage/Landing";
import { Appbar } from "../Appbar/Appbar";
import { toast } from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast.error(data.message || "Login failed. Please try again.");
        return;
      }

      toast.success("Logged in successfully!");
      localStorage.setItem("usertoken", data.token);
      navigate("/users/courses");

    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Appbar />
      <div className="login">
        <div className="card">
          <h1>Login</h1>
          <TextField
            margin="normal"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <TextField
            type="password"
            margin="normal"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <div className="btn">
            <Button 
              variant="contained" 
              onClick={handleLogin} 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div>
              Don't have an account? <Link to="/users/signup">Signup</Link>
            </div>
          </div>
        </div>
      </div>
      <Aboutus />
      <Footer />
    </>
  );
};
