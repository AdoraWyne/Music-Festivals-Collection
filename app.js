// -----------------------------------------------------------
// Require stuff 
require('dotenv').config()
const express = require("express")
const passport = require("passport")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("express-flash")
const mongoDBSession = require('connect-mongodb-session')
const methodOverride = require("method-override")

// const Event = require("./models/events")
const User = require("./models/users")
const authController = require("./controllers/auth")
// const eventsController = require("./controllers/events")

// -----------------------------------------------------------
// Declare or execute stuff
const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session) 
const sessionStore = new MongoDBStore({
    uri: dbURL, 
    collection: "sessions"
})

// -----------------------------------------------------------
// Middlewares
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
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// -----------------------------------------------------------
// home route
app.get("/", (req, res) => {
    res.render("home.ejs")
})


// -----------------------------------------------------------
// export from controller
app.use(authController)
// app.use(eventsController)

// -----------------------------------------------------------
// INDEX
// app.get("/events", async (req,res) => {
//     const events = await Event.find()
//     res.render("index.ejs", {
//         events: events,
//         tabTitle: "All Music Festivals Collection"
//     })
// })

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
