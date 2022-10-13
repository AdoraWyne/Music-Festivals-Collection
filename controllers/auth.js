// Before login routes handler -----------------------------------------------------------
// Require stuff
const express = require("express")
const passport = require("passport")
const User = require("../models/users")

const router = express.Router()

// -----------------------------------------------------------
// register route
router.get("/register", (req, res) => {
    res.render("register.ejs", {
        tabTitle: "Registration"
    })
})

router.post("/register", async (req,res) => {
    const { username, password } = req.body
    try {
        const user = await new User({username})
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, () => {
            req.flash("success", "Welcome to RobDido Music Festival Collection!")
            res.redirect("/events") // prefix routes cant access here, be explicit
        })
    } catch (error) {
        req.flash("error", error.message)
        res.redirect("/events/register")
    }
})

// -----------------------------------------------------------
// login route
router.get("/login", (req,res) => {
    if (req.isAuthenticated()){ // if use logged in, return TRUE
        res.redirect("back") // back to where the user came from
    } else {
        res.render("login.ejs", {
        tabTitle: "Login"
        }) 
    }
})

// for login POST route
// this is what dido taught...
// router.post("/login", passport.authenticate("local", {
//     failureRedirect: "/events/login",
//     successRedirect: "/events",
//     failureFlash: true
// }))

// but if I want to flash success msg after login
router.post("/login", 
    passport.authenticate("local", {
    failureRedirect: "/events/login",
    failureFlash: true
}), (req,res) => {
    req.flash("success", "Welcome Back!")
    res.redirect("/events")
})

// -----------------------------------------------------------
// logout route
router.post("/logout", (req,res) => {
    req.logout(() => {
        req.flash("success", "Sayonara!")
        res.redirect("/events/homeBeforeLogin")
    })
})

// -----------------------------------------------------------
// export
module.exports = router