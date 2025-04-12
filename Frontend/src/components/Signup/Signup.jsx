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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-white px-4">
        <div className="bg-[#1E293B] p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6 my-20 ">
          <h1 className="text-3xl font-bold text-center">Signup</h1>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#cbd5e1" },
            }}
          />
          <TextField
            fullWidth
            type="password"
            margin="normal"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#cbd5e1" },
            }}
          />

          <div className="btn">
            <Button id="btn_signup"
              variant="contained"
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-full transition"
            >
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </div>
            <div className="text-center text-sm text-gray-400">
              Already have an account? <Link className="text-blue-400 hover:underline" to="/users/login">Login</Link>
            </div>
        </div>
        <div>
          <Aboutus />
          <Footer />
        </div>
      </div>
    </>
  );
};
