// -----------------------------------------------------------
// Require stuff 
const express = require("express")
const mongoose = require("mongoose")

const Event = require("./models/events")


// -----------------------------------------------------------
// Declare or execute stuff
const app = express()
const PORT = 3000
const dbURL = 'mongodb://localhost:27017/events'


// -----------------------------------------------------------
// Middlewares
// static assets
app.use(express.static('public'))
// body parser
app.use(express.urlencoded({ extended: true }))

// -----------------------------------------------------------
// Listening or Connecting
mongoose.connect(dbURL, () => {
    console.log("Connecting to products db");
})

app.listen(3000, () => {
    console.log("Listening to port", PORT)
})
