const Admin = require("../models/adminModel");
const Course = require("../models/courseModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminSecret = process.env.ADMIN_SECRET;

const generateJwtAdmin = (admin) => {
  const payload = { username: admin.username, role: "admin" };
  return jwt.sign(payload, adminSecret, { expiresIn: "24h" });
};

const adminController = {
  me: (req, res) => {
    return res.json({ username: req.admin.username });
  },

  signUp: async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(403).json({ message: "Admin already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();

      const token = generateJwtAdmin(newAdmin);
      res.status(201).json({ message: "Admin created successfully.", token });
    } catch (error) {
      res.status(500).json({ message: "Error signing up admin.", error });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(403).json({ message: "Admin authentication failed." });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(403).json({ message: "Invalid credentials." });
      }

      const token = generateJwtAdmin(admin);
      res.json({ message: "Logged in successfully.", token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in admin.", error });
    }
  },

  createCourse: async (req, res) => {
    try {
      const existingCourse = await Course.findOne({ title: req.body.title });
      if (existingCourse) {
        return res.status(409).json({ message: "Course already exists." });
      }

      const newCourse = new Course(req.body);
      await newCourse.save();
      res.status(201).json({ message: "Course created successfully.", courseId: newCourse._id });
    } catch (error) {
      res.status(500).json({ message: "Error creating course.", error });
    }
  },

  editCourse: async (req, res) => {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found." });
      }
      res.json({ message: "Course updated successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error updating course.", error });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find({});
      res.json({ courses });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving courses.", error });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found." });
      }
      res.json({ course });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving course.", error });
    }
  }
};

module.exports = adminController;
