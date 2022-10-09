// Before login -----------------------------------------------------------
// Require stuff
const express = require("express")
const passport = require("passport")
const User = require("../models/users")

const router = express.Router()

// -----------------------------------------------------------
// register route
router.get("/register", (req, res) => {
    res.render("register.ejs")
})

router.post("/register", async (req, res) => {
    const {username, password} = req.body
    try{
        //create new user here
        const user = await User.register(
            new User({username: username}),
            password
        )
        req.login(user, () => {
            res.redirect("/events")
        })
    } catch (error) {
        res.redirect("/register")
    }
})

// -----------------------------------------------------------
// login route

// -----------------------------------------------------------
// logout route

// -----------------------------------------------------------
// export
module.exports = router