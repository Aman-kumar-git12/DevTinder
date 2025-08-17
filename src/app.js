const express = require("express");
const app = express();

const { connectDB } = require("./config/database.js");
const User = require("./models/user.js"); // this user is the model that we created in models/user.js


// Whenever a request comes in with a JSON body, automatically read it, parse it into a JavaScript object, and put it inside req.body.
app.use(express.json()); // Middleware to parse JSON bodies goven by express


app.post("/signup", async (req, res) => {
  const newData = req.body
  try{
    const user = new User(newData)
    console.log("User data is", user)
    await user.save()
    res.status(201).send("Dynamic User created successfully");
  }
  catch(err){
    console.log("Error in crating dynamic user")
    res.status(400).send("Error in creating dynamic user")
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
