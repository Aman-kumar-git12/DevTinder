const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "photoURL"];

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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    // user can see all the random card except his own
    // his connection
    // user cannot see people who ignored by him
    // already sent the connection

    const loogedInUser = req.user;
    // find all the connection which i send + recieved
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loogedInUser._id }, { toUserId: loogedInUser._id }],
    }).select(["fromUserId", "toUserId"]);

    const hideUserFromFeed = new Set();
    
    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      _id: { $nin: Array.from(hideUserFromFeed).concat([loogedInUser._id]) },
    }).select(USER_SAFE_DATA);

    res.send(users);

  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

module.exports = { userRouter };
