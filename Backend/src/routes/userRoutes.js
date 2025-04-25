const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { userAuthentication } = require("../middlewares/authMiddleware");

// Test route to verify query parameter handling
router.get('/test-search', (req, res) => {
    console.log('Test search query:', req.query);
    res.json({ query: req.query });
});

// Main routes
router.get('/courses/search', userController.searchCourses);
router.get('/courses', userController.getAllCourses);
router.post('/courses/:courseId', userAuthentication, userController.purchaseCourse);
router.get('/purchasedCourses', userAuthentication, userController.getPurchasedCourses);
router.get('/me', userAuthentication, userController.me);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;