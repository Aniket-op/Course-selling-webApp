require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to the Database
mongoose.connect(DATABASE_URL);

// Route Handlers
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});