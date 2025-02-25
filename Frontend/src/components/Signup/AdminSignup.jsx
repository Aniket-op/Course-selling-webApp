import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { Appbar } from "../Appbar/Appbar";
import { Aboutus, Footer } from "../LandingPage/Landing";
import { toast } from "react-hot-toast";

export const AdminSignup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      toast.loading("Signing up...", { id: "signup" });

      const response = await fetch(`http://localhost:3000/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      toast.dismiss("signup");

      if (!response.ok) {
        toast.error(data.message || "Signup failed. Please try again.");
        return;
      }

      toast.success("Admin account created successfully!");
      if (data.token) {
        localStorage.setItem("admintoken", data.token);
        navigate(`/admin/courses`);
      }
    } catch (error) {
      toast.dismiss("signup");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Appbar />
      <div className="signup">
        <div className="card">
          <h1>Admin Signup</h1>
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
            <Button variant="contained" onClick={handleSignup}>
              Signup
            </Button>
            <div>
              Already have an account?
              <Link to="/admin/login"> Login</Link>
            </div>
          </div>
        </div>
      </div>
      <Aboutus />
      <Footer />
    </>
  );
};
