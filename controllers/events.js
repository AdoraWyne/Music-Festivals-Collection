// require stuff
const express = require("express")
const ensureLogin = require("connect-ensure-login")

const Event = require("../models/events")
const router = express.Router()
router.use(ensureLogin.ensureLoggedIn())


// -----------------------------------------------------------
// INDEX
router.get("/", async (req,res) => {
    const events = await Event.find()
    res.render("index.ejs", {
        events, // destructing from events: events
        tabTitle: "All Music Festivals Collection"
    })
})

// -----------------------------------------------------------
// NEW & CREATE
// NEW
router.get("/new", (req, res) => {
    res.render("new.ejs", {
        tabTitle: "Add New Music Festival"
    })
})

// CREATE
router.post("/new", async (req, res) => {
    try{
        await Event.create(req.body)
        // Alternativaly for above line:
        // const event = new Event(req.body)
        // await event.save()
        req.flash("success", "Added a new music festival!")
        res.redirect("/events")
    }
    catch (error) {
        req.flash("error", "Unable to add")
        res.redirect("/events/new")
    }
})

// -----------------------------------------------------------
// EDIT & UPDATE
// EDIT
router.get("/:id/edit", async (req,res) => {
    const event = await Event.findById(req.params.id)
    res.render("edit.ejs", {
        event, // destructing from event: event,
        tabTitle: "Edit This Festival"
    })
})

// UPDATE
router.put("/:id", async (req,res) => {
    const event = await Event.findByIdAndUpdate
    (
        req.params.id,
        req.body,
        {new: true}
    )
    req.flash("success", `This music festival is updated`)
    // req.flash("success", `${event.title} is updated`)
    // req.flash("success", `${req.body.title} is updated`)
    res.redirect(`/events/${req.params.id}`)
})

// -----------------------------------------------------------
// DELETE
// Confirm to delete
router.get("/:id/delete", (req, res) => {
    res.render("confirm-delete.ejs", {
        id: req.params.id,
        tabTitle: "Confirmation to Delete"
    })
})
// DELETE
router.delete("/:id", async (req, res) => {
    const event = await Event.findByIdAndRemove(
        req.params.id
    )
    req.flash("success", `This music festival is deleted`)
    res.redirect("/events")
})


// -----------------------------------------------------------
// SHOW
router.get("/:id", async (req,res) => {
    // populate("user") -> display user's info
    const event = await Event.findById(req.params.id).populate("user")
    res.render("show.ejs", {
        event,
        tabTitle: event.title
    })
})

// -----------------------------------------------------------
// export
module.exports = router