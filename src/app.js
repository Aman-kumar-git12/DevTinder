const express = require('express') // Importing the express module

const app = express() // Creating an instance of an Express application

// this will only handle get call to user
app.get('/user', (req,res)=>{
    res.send({firstname: "Aman", lastname: "Kumar"}) // Sending a JSON response to the client
})
app.post('/user', (req,res)=>{
    console.log("save to the database")
    res.send("data successfully saved to the database") // Sending a JSON response to the client
})

app.delete('/user', (req,res)=>{
    res.send("data successfully deleted from the database") // Sending a JSON response to the client
})

// this will match all the https method API calls to test
app.use("/",(req, res)=>{
    res.send(" Hello form Server - i am changed") // Sending a response to the client
})




app.listen(4000 , ()=>{
    console.log("Serveris is successfully listning on port 3000")
}) // Setting the application to listen on port 3000
