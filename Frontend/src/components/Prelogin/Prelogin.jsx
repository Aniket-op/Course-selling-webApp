import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../Appbar/Appbar";
import { Aboutus, Footer } from "../LandingPage/Landing";
import learnerImage from '../LandingPage/images/image-4.webp';
import educatorImage from '../LandingPage/images/image-6.webp';
export const Prelogin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Appbar />
      <div className="min-h-screen bg-[#0F172A] text-white py-16 px-6">
        <Grid container justifyContent="center" spacing={6} className="m-20">
          {/* Learners Card */}
          <Grid item lg={4} md={6} sm={12}>
            <div className="bg-[#1E293B] rounded-2xl p-8 shadow-lg space-y-4 hover:scale-105 transition-transform">
              <h1 className="text-2xl font-bold">For Learners</h1>
              <p>Purchase courses and upskill yourself by learning from industry experts.</p>
              <img src={learnerImage} alt="Learning" className="rounded-2xl shadow-lg" />
              <div className="flex gap-4 mt-4">
                <button
                  id="userLogin"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full transition"
                  onClick={() => navigate("/users/login")}
                >
                  Login
                </button>
                <button
                  id="userSignup"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-full transition"
                  onClick={() => navigate("/users/signup")}
                >
                  Signup
                </button>
              </div>
            </div>
          </Grid>

          {/* Educators Card */}
          <Grid item lg={4} md={6} sm={12}>
            <div className="bg-[#1E293B] rounded-2xl p-8 shadow-lg space-y-4 hover:scale-105 transition-transform">
              <h1 className="text-2xl font-bold">For Educators</h1>
              <p>Showcase your teaching skills and spread your knowledge by publishing your own course.</p>
              <img src={educatorImage} alt="Learning" className="rounded-2xl shadow-lg" />
              <div className="flex gap-4 mt-4">
                <button
                  id="adminSignin"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full transition"
                  onClick={() => navigate("/admin/login")}
                >
                  Login
                </button>
                <button
                  id="adminLogin"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-full transition"
                  onClick={() => navigate("/admin/signup")}
                >
                  Signup
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      <Aboutus />
      <Footer />
      </div>
    </>
  );
};
