const express = require("express");
const app = express();

const { connectDB } = require("./config/database.js");
const User = require("./models/user.js"); // this user is the model that we created in models/user.js
const { ValidateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser"); // read cookie
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

// Whenever a request comes in with a JSON body, automatically read it, parse it into a JavaScript object, and put it inside req.body.
app.use(express.json()); // Middleware to parse JSON bodies goven by express
app.use(cookieParser()); // middlewqre that read the cookie

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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(user); // (5) Success → request continues
  } catch (err) {
    res.status(401).send("Error:", err.message); // Invalid → reject
  }
});

// we are taking data from client
app.post("/signup/single", async (req, res) => {
  try {
    // validation of data
    ValidateSignUpData(req);
    // encrypt your password
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // creating new instance

    const user = new User({
      // this will give us the data that we sent from the client
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save(); // this will save to the database inside the users collection inside the devTinder database
    // console.log(userData)
    res.send("Single User created successfully");
  } catch (err) {
    // console.error(err);
    res.status(400).json({
      message: "Error in creating user",
      error: err.message, // send readable error
      stack: err.stack, // optional: helpful in debugging
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    // 1. Extract email and password from client request body
    const { email, password } = req.body;

    // 2. Check if user exists in database by email
    const user = await User.findOne({ email: email });
    if (!user) {
      // If user not found, throw generic error (do not reveal if email is wrong)
      throw new Error("Invalid credential");
      // Alternative (not recommended for security): throw new Error("Email is not found in database")
    }

    // 3. Compare given password with hashed password stored in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // 4. If password is correct, create a JWT token with user _id as payload
      // When creating token
      const token = jwt.sign({ _id: user._id },"DEV@tinder$790",{ expiresIn: "1d" } // valid for 1 day
       );
      console.log(token); // Debugging: log the token in server console

      // 5. Store token in cookie and send it back to client

      res.cookie("token", token , {
        expires: new Date(Date.now() + 8 * 3600000)
      });

      // 6. Send success response
      res.send("Login Successful!!!");
    } else {
      // If password is invalid, throw generic error
      throw new Error("Invalid credential");
      // Alternative (not recommended for security): throw new Error("Password is not valid")
    }
  } catch (err) {
    // 7. If any error occurs, send 401 Unauthorized with error details
    res.status(401).json({
      message: "Error : Login not successful ",
      error: err.message,
      stack: err.stack,
    });
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("Sending Connection Request");
    res.send("Connection Request Sent");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// delete the data of user
app.delete("/delete", async (req, res) => {
  try {
    const delEmail = req.body._id;
    const user = await User.findByIdAndDelete(delEmail); // user have only first user that matches the email
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Update the dat of user
app.patch("/update", async (req, res) => {
  const UserId = req.body._id;
  data = { ...req.body };
  delete data._id;

  try {
    const ALLOWED_UPDATES = ["firstName", "password", "photoURL"];
    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowed) {
      throw new Error("Invalid update ");
    }

    if (data.firstName && data.firstName.trim().length > 10) {
      throw new Error("firstName should be less than 10 char");
    }

    await User.findByIdAndUpdate(UserId, data, {
      // returnDocument: "after", // returnDocument: "after" will return the updated document
      // runValidators: true, //runValidators: true will run the validators that we have set in the schema
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
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
