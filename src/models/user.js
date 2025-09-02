const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
      index: true,
    },
    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address");
        }
      },
    },

    gender: {
      type: String,

      enum: {
        // worked as validate function
        values: ["male", "female", "others"],
        required: true,
      },

      // validate(value) {
      //   //by default this function run when new data is created  like in get only
      //   // to run while updating the data, we need to use enable for updata
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender is not valid");
      // }
      // },
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
    password: {
      type: String,
    },
    photoURL: {
      type: String,
      default: "https://example.com/default-profile.png",
    },
  },
  {
    // timestamps: true, // timestamps: true will add createdAt and updatedAt fields to the document
    // versionKey: false, // versionKey: false will remove the __v field from the document only when we create the document
  }
);

//compound index
userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@tinder$790", {
    expiresIn: "7d",
  });
  console.log(token);
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
// User is the name fo the model
// userSchema is the schema that we created
// mongoose.model takes two arguments, the first is the name of the model and the second is the schema that we created
