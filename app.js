// -----------------------------------------------------------
// Require stuff 
require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const passport = require('passport')
const methodOverride = require("method-override")
const session = require("express-session")
const flash = require('express-flash')
const mongoDBSession = require("connect-mongodb-session")

const { notFoundHandler, errorHandler } = require('./middlewares/error-handlers')
const Event = require("./models/events")
const eventsController = require("./controllers/events")
const User = require("./models/users")
const authController = require("./controllers/auth")


// -----------------------------------------------------------
// Declare or execute stuff
const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: 'sessions'
})


// -----------------------------------------------------------
// Activation Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })
)
app.use(flash())
// passport has to be after session, ensure login session is restored in the correct order
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// -----------------------------------------------------------
// export from controller
// prefix my routes here for events both controllers
app.use("/events", authController)
app.use("/events", eventsController)
// error
app.use(notFoundHandler)
app.use(errorHandler)

// -----------------------------------------------------------
// Listening or Connecting
mongoose.connect(dbURL, () => {
    console.log("Connecting to events db");
})

app.listen(3000, () => {
    console.log("Listening to port", PORT)
})
