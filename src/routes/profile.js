const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    res.send(user); // (5) Success → request continues
  } catch (err) {
    res.status(401).send("Error:", err.message); // Invalid → reject
  }
});

module.exports = {
  profileRouter,
};
