const express = require("express");
const app = express();

const { connectDB } = require("./config/database.js");
const cookieParser = require("cookie-parser"); // read cookie
const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { requesRouter } = require("./routes/request.js");
const {userRouter} = require("./routes/user.js");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requesRouter);
app.use("/", userRouter)

// get first single data user by email - findOne
// get multiple data users by email - find
app.get("/user", async (req, res) => {
  try {
    const emailID = req.body.email;
    const user = await User.findOne({ email: emailID });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
      console.log("User found:", user);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// delete the data of user
app.delete("/delete", async (req, res) => {
  try {
    const delEmail = req.body._id;
    const user = await User.findByIdAndDelete(delEmail); // user have only first user that matches the email
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Update the dat of user
app.patch("/update", async (req, res) => {
  const UserId = req.body._id;
  data = { ...req.body };
  delete data._id;

  try {
    const ALLOWED_UPDATES = ["firstName", "password", "photoURL"];
    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowed) {
      throw new Error("Invalid update ");
    }

    if (data.firstName && data.firstName.trim().length > 10) {
      throw new Error("firstName should be less than 10 char");
    }

    await User.findByIdAndUpdate(UserId, data, {
      // returnDocument: "after", // returnDocument: "after" will return the updated document
      // runValidators: true, //runValidators: true will run the validators that we have set in the schema
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// resolving the database pormise to connect to the database
connectDB()
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(4000, () => {
      console.log("Serveris is successfully listning on port 4000");
    }); // Setting the application to listen on port 3000
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
