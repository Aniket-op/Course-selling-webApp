const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Course = require("../models/courseModel");

const userSecret = process.env.USER_SECRET;

const generateJwtUser = (user) => {
  const payload = { username: user.username, role: "user" };
  return jwt.sign(payload, userSecret, { expiresIn: "24h" });
};

const userController = {
  // Get current user
  me: (req, res) => {
    return res.json({ username: req.user.username });
  },

  // Signup a new user
  signUp: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if username already exists
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        // return res.status(403).json({ message: "User already exists" });
        return res.status(403).json({ message: "User already exists" });
      }
      // }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // Generate token
      const token = generateJwtUser(newUser);

      res.json({ message: "User created successfully.", token });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  // User Login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(403).json({ message: "User authentication failed." });
      }

      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(403).json({ message: "Invalid credentials." });
      }

      const token = generateJwtUser(user);
      res.json({ message: "Logged in successfully.", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  // Get all available courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      res.json({ courses });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to retrieve courses." });
    }
  },

  // Purchase a course
  purchaseCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found." });
      }

      const user = await User.findOne({ username: req.user.username });

      if (!user) {
        return res.status(403).json({ message: "User not found." });
      }

      // Check if user already purchased the course
      if (user.purchasedCourses.includes(course._id)) {
        return res.json({ message: "You have already purchased this course." });
      }

      user.purchasedCourses.push(course._id);
      await user.save();

      res.json({ message: "Course purchased successfully." });
    } catch (error) {
      console.error("Error purchasing course:", error);
      res.status(500).json({ message: "Error occurred while purchasing course." });
    }
  },

  // Get all purchased courses of a user
  getPurchasedCourses: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.user.username }).populate("purchasedCourses");

      if (!user) {
        return res.status(403).json({ message: "User not found." });
      }

      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
      res.status(500).json({ message: "Failed to retrieve purchased courses." });
    }
  }
};

module.exports = userController;
