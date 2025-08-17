const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
});


module.exports = mongoose.model("User" , userSchema);
// User is the name fo the model
// userSchema is the schema that we created
// mongoose.model takes two arguments, the first is the name of the model and the second is the schema that we created
