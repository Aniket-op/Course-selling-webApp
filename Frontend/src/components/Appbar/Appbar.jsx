import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../GlobalState";

export const Appbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCoursesPage = location.pathname === '/users/courses';
  const isPurchasedCoursesPage = location.pathname === '/users/purchasedCourses';
  const isCreateCoursesPage = location.pathname === '/admin/createCourse';

  const [currentloginState, setcurrentloginState] = useRecoilState(loginState);
  const [userEmail, setUserEmail] = useState("");
  const [allCourseBtnVisible, setAllCourseBtnVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      fetch("http://localhost:3000/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("usertoken"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => { })
        .then((data) => {
          setcurrentloginState({
            user: true,
            admin: false,
          });
          if (data.username) {
            setUserEmail(data.username);
          }
        })
        .catch((err) => { });
    }
    if (localStorage.getItem("admintoken")) {
      fetch("http://localhost:3000/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admintoken"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => { })
        .then((data) => {
          setcurrentloginState({
            user: false,
            admin: true,
          });
          if (data.username) {
            setUserEmail(data.username);
          }
        })
        .catch((err) => { });
    }
  }, []);

  return (
    <div className="bg-[#111827] px-10 py-4 flex items-center justify-between shadow-md">
      <div className="text-white text-4xl font-[Lobster]" onClick={() => navigate("/")}>Sellcourse</div>

      {!currentloginState.user && !currentloginState.admin ? (
        <div className="flex gap-6 text-lg text-gray-300">
          {["Home", "About us", "Follow us", "Contact us"].map((text, idx) => (
            <div
              key={idx}
              className="cursor-pointer hover:text-white  transition-colors duration-200"
              onClick={() => {
                if (text === "Home") navigate("/");
                else document.getElementById(text.includes("About") ? "aboutUs" : "footer")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {text}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-200 font-medium">
            <AccountCircleIcon style={{ color: "white" }} fontSize="large" />
            {userEmail}
          </div>

          {currentloginState.user && (
            <Button
              id="courses"
              variant="contained"
              style={{ backgroundColor: "#2563EB", color: "#fff" }}
              onClick={() => {
                navigate(isCoursesPage ? "/users/purchasedCourses" : "/users/courses");
              }}
            >
              {isCoursesPage ? "My Courses" : "All Courses"}
            </Button>
          )}

          {currentloginState.admin && (
            <Button
              id="courses"
              variant="contained"
              style={{ backgroundColor: "#2563EB", color: "#fff" }}
              onClick={() => {
                navigate(isCreateCoursesPage ? "/admin/courses" : "/admin/createCourse");
              }}
            >
              {isCreateCoursesPage ? "All Courses" : "Add Course"}
            </Button>
          )}

          <Button
            variant="outlined"
            style={{ borderColor: "#fff", color: "#fff" }}
            onClick={() => {
              localStorage.removeItem(currentloginState.user ? "usertoken" : "admintoken");
              setcurrentloginState({ user: false, admin: false });
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>

  );
};

