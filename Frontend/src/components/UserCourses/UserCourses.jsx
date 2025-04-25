import React, { useState, useEffect } from "react";
// import "./UserCourses.css";
import { useRecoilValue } from "recoil";
import { loginState } from "../GlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Appbar } from "../Appbar/Appbar";
import toast from "react-hot-toast";
import "./UserCourses.css";

export const UserCourses = () => {
  const isUserLoggedin = useRecoilValue(loginState);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/users/courses");
      if (response.data && response.data.courses) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error("Error fetching courses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
        fetchAllCourses();
        return;
    }

    setIsLoading(true);
    try {
        // Encode the search term to handle special characters
        const encodedQuery = encodeURIComponent(searchTerm.trim());
        console.log('Searching for:', encodedQuery);
        
        const response = await axios.get(
            `http://localhost:3000/users/courses/search?query=${encodedQuery}`
        );
        
        console.log('Search response:', response.data);
        
        if (response.data && response.data.courses) {
            setCourses(response.data.courses);
            if (response.data.courses.length === 0) {
                toast.info("No courses found matching your search");
            }
        } else {
            console.error('Unexpected response format:', response.data);
            toast.error("Invalid response format from server");
        }
    } catch (error) {
        console.error('Search error:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            toast.error(error.response.data.message || "Error searching courses");
        } else {
            toast.error("Error connecting to server");
        }
    } finally {
        setIsLoading(false);
    }
  };

  const handleBuyCourse = async (courseId) => {
    if (!isUserLoggedin.user) {
      toast.error("Please Login/Signup before buying.");
      navigate("/users/login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/users/courses/${courseId}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("usertoken"),
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error.response?.data?.message || "Error purchasing course");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchAllCourses();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      
      {/* Search Section */}
      <div className="bg-white shadow">
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto p-4 flex gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-colors
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto p-6">
        {courses.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            {isLoading ? "Loading..." : "No courses found"}
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
                      onClick={() => handleBuyCourse(course._id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Buy Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
