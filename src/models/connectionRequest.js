const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //referance to the user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect  status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

//compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  //chekc is fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You Cannot send connection request to yourself");
  }
  next();
});

const connectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
// Mongoose automatically converts it to a collection name in lowercase and plural form: connectionrequests
module.exports = connectionRequestModel;
