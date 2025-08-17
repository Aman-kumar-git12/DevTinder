const mongoose = require('mongoose'); // CommonJS
const connectDB = async () =>{
     await mongoose.connect('mongodb+srv://namstedev:n1a2m3a4s5t6e7@namstenode.rwspomw.mongodb.net/devTinder') // connection between node with database cluster
}

module.exports = {
    connectDB, 
}