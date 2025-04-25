import React, { useState, useEffect } from "react";
import axios from "axios";
import "../UserCourses/UserCourses.css"
import { Appbar } from "../Appbar/Appbar";
import { useRecoilValue } from "recoil";
import { loginState } from "../GlobalState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CourseDetailsModal } from "./CourseDetailsModal";

export const UserPurchasedCourses = () => {
    const isUserLoggedin = useRecoilValue(loginState);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      fetchPurchasedCourses();
    }, []);

    const fetchPurchasedCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/users/purchasedCourses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("usertoken"),
          },
        });
        if (response.data && response.data.purchasedCourses) {
          setCourses(response.data.purchasedCourses);
        }
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        toast.error("Error fetching purchased courses");
      } finally {
        setIsLoading(false);
      }
    };

    const handleViewCourse = (course) => {
      setSelectedCourse(course);
    };

    const handleCloseModal = () => {
      setSelectedCourse(null);
    };
    
  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Purchased Courses</h1>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            You haven't purchased any courses yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={course.imageLink}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{course.price}
                    </span>
                    <button
                      onClick={() => handleViewCourse(course)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
