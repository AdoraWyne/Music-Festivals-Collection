// Before login routes handler-----------------------------------------------------------
// Require stuff
const express = require("express")

const router = express.Router()

// -----------------------------------------------------------
// register route
router.get("/register", (req, res) => {
    res.render("register.ejs")
})

// router.post("/register", async (req, res) => {
//     const {username, password} = req.body
//     try{
//         //create new user here
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
// })

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