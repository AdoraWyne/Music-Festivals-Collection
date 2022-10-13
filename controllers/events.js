// require stuff
const express = require("express")
const mongoose = require("mongoose")
const ensureLogin = require("connect-ensure-login")

const Event = require("../models/events")
const User = require("../models/users")
const upload = require("../middlewares/upload")
const { route } = require("./auth")
const router = express.Router()
router.use(ensureLogin.ensureLoggedIn())


// -----------------------------------------------------------
// INDEX
router.get("/", async (req,res) => {
    const events = await Event.find()
    const user = await User.findOne(req.user._id)
    res.render("index.ejs", {
        events, // destructing from events: events
        user,
        tabTitle: "All Music Festivals Collection"
    })
})

// -----------------------------------------------------------
// NEW & CREATE
// NEW
router.get("/new", async (req, res) => {
    const user = await User.findOne(req.user._id)
    res.render("new.ejs", {
        user,
        tabTitle: "Add New Music Festival"
    })
})

// CREATE
router.post("/new", upload.single("imageURL"), async (req, res) => {
    // console.log(req.body, req.file);
    req.body.imageURL = req.file.path
    try{
        // await Event.create(req.body)
        // Alternativaly for above line:
        // const event = new Event(req.body)
        // await event.save()
        // testing for user as author, cuz I'm not sure how to use Event.create to include user._id
        const event = new Event(req.body)
        req.params.id = event._id
        event.author = req.user._id
        await event.save()
        req.flash("success", `${event.title} is added`)
        res.redirect(`/events/${req.params.id}`)
    }
    catch (error) {
        // console.log(error);
        req.flash("error", "Unable to add")
        res.redirect("/events/new")
    }
})

// -----------------------------------------------------------
// WISHLIST route
// GET route
router.get("/:username/wishlist", async (req, res) => {
    const user = await User.findOne({username: req.params.username}).populate("wishList")
    console.log(user);
    res.render("wishlist.ejs", {
        user: user,
        tabTitle: "My Wishlist"
    })
})

// add to wishlist route
router.put("/wishlist/:id", async(req, res) => {
    const event = await Event.findById(req.params.id)
    const user = await User.findById(req.user._id.toString())
    user.wishList.push(event)
    await user.save()
    res.redirect(`/events/${user.username}/wishlist`)
})

// delete wishlist route
router.put("/wishlist/delete/:wishlistID", async (req,res)=> {
    console.log(abcd);
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: {
            wishList: req.params.wishlistID
          }
        }
      )
      console.log(user);
      req.flash("success", `Wishlist is updated`)
      res.redirect(`/events/${user.username}/wishlist`)
})

// -----------------------------------------------------------
// EDIT & UPDATE
// EDIT
router.get("/:id/edit", async (req,res) => {
    try {
        const event = await Event.findById(req.params.id)
        const user = await User.findOne(req.user._id)
        if (!event) {
            throw new Error("Not Found")
        }
        res.render("edit.ejs", {
            event, 
            user,
            tabTitle: "Edit This Festival",
            // new thing here: extract Event's category field into an array
            categories: Event.schema.path('category').enumValues
        })
    } catch {
        next ()
    }
})

// UPDATE
router.put("/:id", upload.single("imageURL"), async (req,res) => {
    if (req.file) {
        req.body.imageURL = req.file.path
    }
    const event = await Event.findByIdAndUpdate
    (
        req.params.id,
        req.body,
        {new: true}
    )
    req.flash("success", `${event.title} is updated`)
    res.redirect(`/events/${req.params.id}`)
})

// -----------------------------------------------------------
// DELETE
router.delete("/:id", async (req, res) => {
    const event = await Event.findByIdAndRemove(
        req.params.id
    )
    req.flash("success", `${event.title} is deleted`)
    res.redirect("/events")
})


// -----------------------------------------------------------
// SHOW
router.get("/:id", async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id).populate("author")
        const user = await User.findOne(req.user._id).populate("wishList")
        const isInWishlist = user.wishList.some((item) => {
            return item.title === event.title 
        })
        console.log(isInWishlist);
        // if return true, means the event is in the wishlist. button: "Added to wishlist"
        if (event) {
        res.render("show.ejs", {
            event,
            user,
            isInWishlist,
            tabTitle: event.title
        })
    } else {
        throw new Error ("Music Festival not found")
    }
    } catch {
        next ()
    }
})

// -----------------------------------------------------------
// export
module.exports = router