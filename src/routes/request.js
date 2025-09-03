const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requesRouter = express.Router();

requesRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // this line is very important
      // it create constraint that user can has status type of interested or ingnored
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ error: "Invalid status type" });
      }

      //toUser exist check
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }

      //Existing user exist check
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({
          success: false,
          message: "Already sent the connection request before",
        });
      }

      const newConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await newConnectionRequest.save();
      res.json({
        message: "Connection Request Successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

requesRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loogedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status is not allowed",
        });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loogedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(400).json({
          message: "connection request not found",
        });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: "Connection request  ",
        data,
      });

      // Aman -> virat
      // loogedInId = toUserId
      // status = interested
      // request id should be valid
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

module.exports = { requesRouter };
