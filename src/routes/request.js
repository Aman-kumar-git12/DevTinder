const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requesRouter = express.Router();

requesRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("Sending Connection Request");
    res.send("Connection Request Sent");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = { requesRouter };
