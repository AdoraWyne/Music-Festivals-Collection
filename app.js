// -----------------------------------------------------------
// Require stuff 
//require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const session = require("express-session")
const mongoDBSession = require("connect-mongodb-session")

const Event = require("./models/events")
const eventsController = require("./controllers/events")
// const User = require("./models/users")
// const authController = require("./controllers/auth")

// -----------------------------------------------------------
// Declare or execute stuff
const app = express()
const PORT = 3000
const dbURL = "mongodb://localhost:27017/events"
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: 'sessions'
})


// -----------------------------------------------------------
// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(
    session({
        secret:"thisisnotgoodsecret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })
)


// -----------------------------------------------------------
// routes


// -----------------------------------------------------------
// export from controller
// prefix my routes here for events controller
app.use("/events", eventsController)


// -----------------------------------------------------------
// Setup / Admin Route





// -----------------------------------------------------------
// Listening or Connecting
mongoose.connect(dbURL, () => {
    console.log("Connecting to products db");
})

app.listen(3000, () => {
    console.log("Listening to port", PORT)
})
