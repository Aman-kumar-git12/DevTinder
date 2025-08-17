const express = require("express");
const app = express();

const { connectDB } = require("./config/database.js");
const User = require("./models/user.js"); // this user is the model that we created in models/user.js

app.post("/signup/single", async (req, res) => {
  // creating a new instance of the User model
  // simply we create a obj used as data to be saved in the database
  // and then pass in the instance of the User model
  // and then call the save method to save the data in the database

  //   for sending one user data
  const user = new User({
    firstName: "Aman",
    lastName: "Kumar",
    email: "aman@gmail.com",
    age: 20,
    password: "aman@123",
  });

  // saving the user instance to the database
  // this will return a promise, so we can use async/await or .then()
  try {
    await user.save(); // this will save to the database inside the users collection inside the devTinder database
    res.send("Single User created successfully");
  } catch (err) {
    res.status(400).send("Error in creating user");
  }
});




// for sending multiple users data
app.post("/signup/multiple", async (req, res) => {
  try {
    await User.insertMany([
      {
        firstName: "Aman",
        lastName: "Kumar",
        email: "aman@gmail.com",
        age: 20,
        password: "aman@123",
      },
      {
        firstName: "Mohit",
        lastName: "Singh",
        email: "mohit@123@gmail.com",
        age: 19,
        password: "mohit@123",
      },
      {
        firstName: "virat",
        lastName: "Kohli",
        email: "virat@gmail.com",
        age: 35,
        password: "virat@123",
      },
    ]);
    res.send("Multiple Users created successfully" )

  } catch (err) {
    res.status(400).send("Error in creating users");
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
