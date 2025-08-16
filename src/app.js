const express = require("express");
const app = express();



// // with try catch 
// app.get("/getUserId", (req, res, next) => {
//   console.log("getUserId is running...");
//   try {
//     // Simulating an error
//     throw new Error("Simulated error");
//     res.send("User data sent");
//   } catch (error) {
//     res.send("Error from catch"); // Pass the error to the next middleware
//   }
// });



// handling error in our code
app.get("/getUserId", (req, res, next) => {
  console.log("getUserId is running...");
  // Simulating an error
  throw new Error("Simulated error");
  res.send("User data sent");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(401).send("data is unauthorised");
  }
});



app.listen(4000, () => {
  console.log("Serveris is successfully listning on port 4000");
}); // Setting the application to listen on port 3000
