import React from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../Appbar/Appbar";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Image1 from "./images/image-1.jpeg";
import Image2 from "./images/image-2.jpeg";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Appbar />
      <div className="bg-[#0F172A] text-white min-h-screen px-10">
        <div className="max-w-7xl mx-auto py-20 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-6 md:w-1/2 ">
            <h1 className="text-5xl font-bold leading-tight">
              Master New Skills <br />
              <span className="text-blue-400">Today</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Unlock your potential with Sellcourse's online courses. Learn from industry experts and stay ahead of the competition.
            </p>
            <div className="flex justify-center">
              <button
                id="startbtn"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full flex items-center transition-all "
                onClick={() => navigate("/start")}
              >
                Get Started <TrendingFlatIcon />

              </button>
            </div>


          </div>
          <div className="md:w-1/2">
            <img src={Image2} alt="Learning" className="rounded-2xl shadow-lg" />
          </div>
        </div>

        <Aboutus />
        <Footer />
      </div>
    </>
  );
};

export const Aboutus = () => {
  return (
    <div id="aboutUs" className="py-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        <div className="md:w-1/2">
          <img src={Image1} alt="About us" className="rounded-2xl shadow-md" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-blue-400">About Us</h2>
          <p className="text-gray-300">
            At Sellcourse, we are a leading company in providing online courses. Our mission is to provide a platform where individuals can enhance their skills and knowledge through a wide range of courses offered by industry experts.
            Whether you want to learn or teach, Sellcourse is here to help you achieve your goals. Our user-friendly interface, comprehensive course catalog, and secure payment system make your learning experience seamless and enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <>
      <div id="footer" className="bg-[#1E293B] py-10 text-gray-300 px-6 rounded-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Follow us</h3>
            <ul className="space-y-1">
              <li>Twitter</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Contact us</h3>
            <ul className="space-y-1">
              <li>Email: Sellcourse@gmail.com</li>
              <li>Phone: +91 9370837735</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#0F172A] text-gray-400 py-4 text-center text-sm border-t border-gray-700">
        <div>Test Automation Evaluation</div>
        <div className="flex justify-center items-center gap-1 mt-1">
          <span>Copyright</span>
          <CopyrightIcon fontSize="small" />
          <span>2025 Sellcourse | All rights reserved.</span>
        </div>
      </div>
    </>
  );
};
