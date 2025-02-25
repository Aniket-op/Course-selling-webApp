import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { Appbar } from "../Appbar/Appbar";
import { Aboutus, Footer } from "../LandingPage/Landing";
import { toast } from "react-hot-toast";

export const Signup = () => {

  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = () => {
    if(!username || !password)
    {
      // alert("Please enter both the fields.");
      toast.error("Please enter both the fields.");
      return;
    }
    fetch(`http://localhost:3000/users/signup` , {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then( res => {
      return res.json();
    }).then( data => {
      // alert(data.message);
      toast.success(data.message);
      if(data.token)
      {
        localStorage.setItem("usertoken",data.token);
        navigate(`/users/courses`);
      }
    })
  }

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
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          type="password"
          margin="normal"
          label="Password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <div className="btn">
          <Button variant="contained" onClick={() => {handleSignup()}}>Signup</Button>
          <div>
             Already have an account ?
            <Link to="/users/login"> Login</Link>
          </div>
        </div>
      </div>
    </div>
    <Aboutus />
    <Footer />
    </>
  );
};
