const express = require("express");
const app = express();

const { connectDB } = require("./config/database.js");
const User = require("./models/user.js"); // this user is the model that we created in models/user.js

// Whenever a request comes in with a JSON body, automatically read it, parse it into a JavaScript object, and put it inside req.body.
app.use(express.json()); // Middleware to parse JSON bodies goven by express


// get first single data user by email - findOne 
// get multiple data users by email - find
app.get("/user", async (req, res) => {
  try {
    const emailID = req.body.email;
    const user = await User.findOne({ email: emailID });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
      console.log("User found:", user);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});


// // Feed API - GET /feed  - get all the users from the database
app.get("/feed", async (req, res) => {
  try{
    const user = await User.find({})
    console.log("Users found")
    res.send(user)
  }catch(err){
    res.status(500).send("Something went wrong")
  }
});




// resolving the database pormise to connect to the database
connectDB()
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(4000, () => {
      console.log("Serveris is successfully listning on port 4000");
    }); // Setting the application to listen on port 3000
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
