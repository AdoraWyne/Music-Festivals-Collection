// Before login routes handler-----------------------------------------------------------
// Require stuff
const express = require("express")
const User = require("../models/users")

const router = express.Router()

// -----------------------------------------------------------
// register route
router.get("/register", (req, res) => {
    res.render("register.ejs")
})

router.post("/register", async (req,res) => {
    const { username, password } = req.body
    const user = await new User({username})
    const registeredUser = await User.register(user, password)
     // req.flash("success", "Welcome to RobDido Music Festival Collection!")
    req.login(registeredUser, () => {
        res.redirect("/events") // prefix routes cant access here, be explicit
    })
})

//     try{
//         const user = await User.register(
//             new User({username: username}),
//             password
//         )
//         req.login(user, () => {
//             res.redirect("/events")
//         })
//     } catch (error) {
//         res.redirect("/register")
//     }

// -----------------------------------------------------------
// login route
router.get("/login", (req,res) => {
    res.render("login.ejs")
})

// -----------------------------------------------------------
// logout route

// -----------------------------------------------------------
// export
module.exports = router