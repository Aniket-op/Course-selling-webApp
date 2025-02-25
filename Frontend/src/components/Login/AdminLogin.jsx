import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { Appbar } from "../Appbar/Appbar";
import { Aboutus, Footer } from "../LandingPage/Landing";
import { toast } from "react-hot-toast";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      toast.loading("Logging in...", { id: "login" });

      const response = await fetch(`http://localhost:3000/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      toast.dismiss("login");

      if (!response.ok) {
        toast.error(data.message || "Login failed. Please try again.");
        return;
      }

      toast.success("Logged in successfully!");
      if (data.token) {
        localStorage.setItem("admintoken", data.token);
        navigate(`/admin/courses`);
      }
    } catch (error) {
      toast.dismiss("login");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Appbar />
      <div className="login">
        <div className="card">
          <h1>Admin Login</h1>
          <TextField
            margin="normal"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="password"
            margin="normal"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="btn">
            <Button id="btn_Login"
            variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <div>
              Don't have an account?
              <Link to="/admin/signup"> Signup</Link>
            </div>
          </div>
        </div>
      </div>
      <Aboutus />
      <Footer />
    </>
  );
};
