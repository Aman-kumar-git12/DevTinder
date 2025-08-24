const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditFields } = require("../utils/validation");
const { connectDB } = require("../config/database");
const user = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(user); // (5) Success → request continues
  } catch (err) {
    res.status(401).send("Error:", err.message); // Invalid → reject
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditFields(req)) {
      throw new Error("Invalid Edit request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: ` ${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = {
  profileRouter,
};
