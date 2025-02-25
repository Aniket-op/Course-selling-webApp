import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { Appbar } from "../Appbar/Appbar";
import { Aboutus, Footer } from "../LandingPage/Landing";
import { toast } from "react-hot-toast";

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !password) {
      toast.error("Please enter both fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast.error(data.message || "Signup failed.");
        return;
      }

      toast.success("Signup successful!");
      localStorage.setItem("usertoken", data.token);
      navigate("/users/courses");
      
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Appbar />
      <div className="signup">
        <div className="card">
          <h1>Signup</h1>
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
              onClick={handleSignup} 
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </Button>
            <div>
              Already have an account? <Link to="/users/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
      <Aboutus />
      <Footer />
    </>
  );
};
