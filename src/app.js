const express = require("express");
const app = express();

const { connectDB } = require("./config/database.js");
const User = require("./models/user.js"); // this user is the model that we created in models/user.js

// Whenever a request comes in with a JSON body, automatically read it, parse it into a JavaScript object, and put it inside req.body.
app.use(express.json()); // Middleware to parse JSON bodies goven by express



// delete the data of user
app.delete('/delete', async(req, res)=>{
  try{
    const delEmail = req.body._id
    const user = await User.findByIdAndDelete(delEmail); // user have only first user that matches the email
    if(!user){
      return res.status(404).send("User not found");
    }

    res.send(user)

  }catch(err){
    res.status(500).send("Something went wrong")
  }
})



// Update the dat of user 
app.patch('/update', async(req, res)=>{
  const UserId = req.body._id
  data = req.body
  try {
    await User.findByIdAndUpdate(UserId, data)
    res.send("User updated successfully");


  }catch(err){
    res.status(500).send("Something went wrong")
  }
})




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
