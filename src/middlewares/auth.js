const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Get token from cookies
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not valid");

    // Verify token & extract user ID
    const decodedObj = await jwt.verify(token, "DEV@tinder$790", {
      expiresIn: "7d",
    });
    const { _id } = decodedObj;


    // Find user in DB
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");

    // Attach user to request for next handler
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
