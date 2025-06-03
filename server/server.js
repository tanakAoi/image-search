const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/users.router");
const userRouter = require("./routers/user.router");
const imagesRouter = require("./routers/images.router");
const searchRouter = require("./routers/search.router");
const connectDB = require("./db");

require("dotenv").config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "https://image-search-three-iota.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routers
app.use("/api/users", usersRouter);
app.use("/api/user", userRouter);
app.use("/api/images", imagesRouter);
app.use("/api/search", searchRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
