const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const CardModel = require("./models/Card");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'uploads')));

const mongoURL = 'mongodb://127.0.0.1:27017/dbs';

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();

const fs = require('fs');

let lastCardId = 0; // Initialize the counter for generating sequential card IDs

app.post("/add-card", (req, res) => {
  const { userId, image, title, tech, link, content } = req.body;
 
  // Decode the base64 string
  const img = image.split(';base64,').pop();
 
  // Define the path where the image will be saved
  const uploadDir = path.join(__dirname, 'uploads');
  const imagePath = path.join(uploadDir, `${Date.now()}.png`);
 
  // Ensure the upload directory exists
  fs.mkdir(uploadDir, { recursive: true }, (err) => {
     if (err) {
       console.error("Error creating directory:", err);
       return res.status(500).json({ error: "Internal server error" });
     }
 
     // Write the image to the file system
     fs.writeFile(imagePath, img, { encoding: 'base64' }, (err) => {
       if (err) {
         console.error("Error saving image:", err);
         return res.status(500).json({ error: "Internal server error" });
       }
       lastCardId++;
       // Create a new card with the image path and userId
       const newCard = new CardModel({
         userId, // Store the userId
         image: imagePath, // Store the path of the image
         title,
         tech,
         link,
         content
       });
 
       newCard.save()
         .then((card) => {
           console.log("Card added:", card);
           res.json({ message: "Card added successfully", card });
         })
         .catch((error) => {
           console.error("Error adding card:", error);
           res.status(500).json({ error: "Internal server error" });
         });
     });
  });
 });
 

 app.post("/add-cards", (req, res) => {
  const { userId, image, title, tech, link, content } = req.body;
    
    lastCardId++;
    console.log(image);
    // Create a new card with the image path and userId
    const newCard = new CardModel({
      userId, // Store the userId
      image, // Store the relative path of the image
      title,
      tech,
      link,
      content
    });

    newCard.save()
      .then((card) => {
        console.log("Card added:", card);
        res.json({ message: "Card added successfully", card });
      })
      .catch((error) => {
        console.error("Error adding card:", error);
        res.status(500).json({ error: "Internal server error" });
      });
});


app.post("/register", (req, res) => {
  const userId = uuidv4();
 
  // Create a new user with the incremented userIdCounter as the user ID
  const newUser = new UserModel({
     id: userId, // Use the userIdCounter as the user ID
     ...req.body // Spread the rest of the request body to include other user properties
  });
  console.log(userId);
 
  newUser.save()
     .then((user) => res.json(user))
     .catch((err) => res.json(err));
 });
 
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ userId: user.id, message: "Success" }); // Send user ID along with success message
        } else {
          res.json({ message: "Incorrect password" });
        }
      } else {
        res.json({ message: "No user found" });
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Assuming you have a CardModel defined
app.get("/api/cards/:userId", async (req, res) => {
  try {
     const userId = req.params.userId;
     console.log("in");
     console.log(userId);
     const cards = await CardModel.find({ userId: userId });
     console.log("cards");
     console.log(cards);
     res.json(cards);
  } catch (error) {
     console.error("Error fetching cards:", error);
     res.status(500).json({ error: "Internal server error" });
  }
 });
 app.get("/api/cards", async (req, res) => {
  try {
     // Query the CardModel for all cards
     const cards = await CardModel.find({});
     console.log("All cards:", cards);
     res.json(cards);
  } catch (error) {
     console.error("Error fetching all cards:", error);
     res.status(500).json({ error: "Internal server error" });
  }
 });
 
 
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
