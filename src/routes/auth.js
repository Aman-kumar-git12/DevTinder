const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { ValidateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup/single", async (req, res) => {
  try {
    // validation of data
    ValidateSignUpData(req);
    // encrypt your password
    const { firstName, lastName, email, gender , age , password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // creating new instance

    const user = new User({
      // this will give us the data that we sent from the client
      firstName,
      lastName,
      email,
      gender,
      age,
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

authRouter.post("/login", async (req, res) => {
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
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // 4. If password is correct, create a JWT token with user _id as payload
      const token = await user.getJWT();
      // console.log(token); // Debugging: log the token in server console

      // 5. Store token in cookie and send it back to client

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
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
    res.status(400).json({
      message: "Error : Login not successful ",
      error: err.message,
      stack: err.stack,
    });
  }
});


// it's not reuqire to write in try/catch
authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    })
    res.send("User Logged out Successfully");
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

module.exports = { authRouter };
