const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

//** Create and get user 
// MongoDB connection
mongoose
  .connect(
    'mongodb://localhost:27017/mydb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Define schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
});

const User = mongoose.model("User", userSchema);
app.post("/users", async (req, res) => {
  try {
    console.log("bodyy= ", req.body);
    const user = new User(req.body);
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(400).json({ error: err.message || "Failed to save user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});



// ** Caching
let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 10 * 60 * 1000;

app.get("/data", async (req, res) => {
  const now = Date.now();

  // Check if cached data is available and still valid
  if (cachedData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
    console.log("Serving data from cache");
    return res.json(cachedData);
  }

  // Fetch fresh data and update cache
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    cachedData = data;
    cacheTimestamp = now;
    console.log("Fetched fresh data");
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});



// ** pagination
const users = [
  { name: "John" },
  { name: "Jane" },
  { name: "Jim" },
  { name: "Jake" },
  { name: "Jill" },
  { name: "Jack" },
  { name: "Jason" },
];

app.get("/users-data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedUsers = users.slice(startIndex, endIndex);

  res.json({
    total: users.length,
    page,
    limit,
    users: paginatedUsers,
  });
});



// ** API rate limiting
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiter to /data route only
app.use("/data-rate-limit", limiter);

app.get("/data-rate-limit", (req, res) => {
  res.json({ message: "Data fetched successfully" });
});



// ** file download
app.get("/download", (req, res) => {
  const filePath = "file.pdf";
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist:", filePath);
      return res.status(404).send("File not found");
    }

    res.download(filePath, "file.pdf", (err) => {
      if (err) {
        console.error("Error during download:", err);
        res.status(500).send("Error downloading the file");
      }
    });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
