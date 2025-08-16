const express = require("express");
const app = express();

// app.get("/user", (req, res) => {
//     console.log(req.query); // logs: { name: 'Aman', age: '20' }
//     res.send({ firstname: "Aman", lastname: "Kumar" });
// });

// app.post('/user', (req,res)=>{
//     console.log("save to the database")
//     res.send("data successfully saved to the database") // Sending a JSON response to the client
// })

// app.delete('/user', (req,res)=>{
//     res.send("data successfully deleted from the database") // Sending a JSON response to the client
// })

// // this will match all the https method API calls to test
// app.use("/",(req, res)=>{
//     res.send(" Hello form Server - i am changed") // Sending a response to the client
// })

// app.get("/user", (req, res) => {
//   console.log(req.query); // logs: { name: 'Aman', age: '20' }
// }); // request will run infinitely,

// app.get(
//   "/user",
//   (req, res) => {
//     console.log(req.query); // logs: { name: 'Aman', age: '20' }
//     res.send("Response 1");
//   },
//   (req, res) => {
//     res.send("Response 2");
//   }
// ); // only first will return the response , because js is single threaded




// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log(req.query); // logs: { name: 'Aman', age: '20' }
//     //   res.send("Response 1");
//     next()
//   },
//   (req, res) => {
//     console.log("This is the second middleware function");
//     res.send("Response 2");
//   }
// ); // 2ND RESPONSE

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log(req.query); // logs: { name: 'Aman', age: '20' }
//       res.send("Response 1");
//     next()
//   },
//   (req, res) => {
//     console.log("This is the second middleware function");
//     res.send("Response 2");
//   }
// ); // it will show error because response is already sent in the first middleware function, Cannot set headers after they are sent to the client


// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log(req.query); // logs: { name: 'Aman', age: '20' }
//     next()
//       res.send("Response 1");
//   },
//   (req, res) => {
//     console.log("This is the second middleware function");
//     res.send("Response 2");
//   }
// ); // this time 2nd response will sent first and while first response send it will show error



// we can wrap in the array

// app.get(
//   "/user",
//   [(req, res, next) => {
//     console.log(req.query); // logs: { name: 'Aman', age: '20' }
//     next()
//       res.send("Response 1");
//   },
//   (req, res) => {
//     console.log("This is the second middleware function");
//     res.send("Response 2");
//   }]
// ); // this time 2nd response will sent first and while first response send it will show error

// app.get ("/route" , rh , rh2 , rh3 , rh4 , rh5 ) // correct
// app.get ("/route" , [rh , rh2 , rh3 , rh4 , rh5] ) // correct
// app.get ("/route" , [rh , rh2 , rh3 ], rh4 , rh5 ) // correct
// app.get ("/route" , [rh] , [rh2] , [rh3] , rh4 , rh5 ) // correct
// app.get ("/route" , rh , [rh2 , rh3 , rh4] , rh5 ) // correct



app.listen(4000, () => {
  console.log("Serveris is successfully listning on port 4000");
}); // Setting the application to listen on port 3000
