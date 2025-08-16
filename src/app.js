const express = require('express') // Importing the express module

const app = express() // Creating an instance of an Express application

app.use((req, res)=>{
    res.send(" Hello form Server - i am changed") // Sending a response to the client
})

app.listen(4000 , ()=>{
    console.log("Serveris is successfully listning on port 3000")
}) // Setting the application to listen on port 3000
