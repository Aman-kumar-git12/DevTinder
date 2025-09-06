const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending connection request for the logged in user
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loogedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loogedInUser._id,
      status: "interested",
    }).populate({
      path: "fromUserId",
      select: ["firstName", "lastName", "email", "photoURL"],
    });
    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = { userRouter };
