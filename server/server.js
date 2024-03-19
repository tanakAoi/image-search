const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const { validate } = require("./validate");
const { favoriteImageSchema } = require("./schemas/favoriteImage.schema");
const { userSchema } = require("./schemas/user.schema");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

const getDataFromFile = async () => {
  try {
    const fileData = await fs.readFile("users.json");
    users = JSON.parse(fileData);
    console.log("Users data loaded successfully");
  } catch (error) {
    console.error("Error reading file:", error);
  }
};
getDataFromFile();

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
  console.log("Users data loaded successfully");
});

app.get("/api/user/:userId", (req, res) => {
  const user = users.find((user) => user.userId == req.params.userId);
  res.status(200).json(user);
  console.log("User data loaded successfully");
});

app.post("/api/user/:userId", validate(userSchema), (req, res) => {
  const existingUser = users.find((user) => user.userId === req.params.userId);
  if (!existingUser) {
    const newUser = {
      user: req.body.userName,
      userId: req.body.userId,
      favoriteImages: [],
    };
    users.push(newUser);
    try {
      const writeFile = async () => {
        await fs.writeFile("users.json", JSON.stringify(users, null, 1));
      };
      writeFile();
      res.status(201).json(req.body);
      console.log("User added successfully");
    } catch (error) {
      console.error("Error writing to file:", error);
      res.status(500).json({ error: "Error writing to file" });
    }
  } else {
    console.log("User already exists");
  }
});

app.put("/api/user/:userId", validate(favoriteImageSchema), (req, res) => {
  const user = users.find((user) => user.userId == req.params.userId);
  if (user) {
    user.favoriteImages = req.body;
    try {
      const writeFile = async () => {
        await fs.writeFile("users.json", JSON.stringify(users, null, 1));
      };
      writeFile();
      res.status(200).json(req.body);
    } catch (error) {
      console.error("Error writing to file:", error);
      res.status(500).json({ error: "Error writing to file" });
    }
  } else {
    console.log("User not found");
  }
});

app.listen(3000, () => console.log("Server is up and running..."));
