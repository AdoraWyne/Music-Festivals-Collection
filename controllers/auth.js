// Before login routes handler-----------------------------------------------------------
// Require stuff
const express = require("express")
const passport = require("passport")
const User = require("../models/users")

const router = express.Router()


// res.render("index.ejs", {
//     events: events,
//     tabTitle: "All Music Festivals Collection"
// })

// -----------------------------------------------------------
// register route
router.get("/register", (req, res) => {
    res.render("register.ejs", {
        tabTitle: "Registration"
    })
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
    res.render("login.ejs", {
        tabTitle: "Login"
    }) 
})

// this is what dido taught...
// router.post("/login", passport.authenticate("local", {
//     failureRedirect: "/events/login",
//     successRedirect: "/events",
//     failureFlash: true
// }))

// but if I want to flash success msg
router.post("/login", 
    passport.authenticate("local", {
    failureMessage: true,
    failureRedirect: "/events/login"
}), (req,res) => {
    // req.flash("success", "Welcome Back!")
    res.redirect("/events")
})

// -----------------------------------------------------------
// logout route
router.post("/logout", (req,res) => {
    req.logout(() => {
        res.redirect("/events")
    })
    // req.flash("success", "Sayonara!")
})

// -----------------------------------------------------------
// export
module.exports = router