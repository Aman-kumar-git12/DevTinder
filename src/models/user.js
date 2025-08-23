const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String, // the type of the field is string
      required: true, //this field is required
      minlength: 4, //this field must be atleast 4 characters long
      // maxlength: 5, //this field must be atmost 5 characters long
    },
    lastName: {
      type: String,
    },


    email: {
      type: String,
      required: true,
      unique: true, // this field must be unique, no two users can have the same email
      trim: true, //this removes any whitespaces from beginnning and the end of the string
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid Email address")
        }
      }
    },

    gender: {
      type: String,
      validate(value) {
        //by default this function run when new data is created  like in get only
        // to run while updating the data, we need to use enable for updata
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    age: {
      type: Number,
      min: 18, //this field must be atleast 18 years old
      max: 60, //this field must be atmost 60 years old
    },
    password: {
      type: String,
    },
    photoURL: {
      type: String,
      default: "https://example.com/default-profile.png", // default value of photo url
    },
  },
  {
    timestamps: true, // timestamps: true will add createdAt and updatedAt fields to the document
    versionKey: false, // versionKey: false will remove the __v field from the document only when we create the document
  }
);

module.exports = mongoose.model("User", userSchema);
// User is the name fo the model
// userSchema is the schema that we created
// mongoose.model takes two arguments, the first is the name of the model and the second is the schema that we created
