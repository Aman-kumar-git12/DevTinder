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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // console.log(loggedInUser);
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate({ path: "fromUserId", select: ["firstName", "lastName"] })
      .populate({ path: "toUserId", select: ["firstName", "lastName"] });

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      data,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

module.exports = { userRouter };
