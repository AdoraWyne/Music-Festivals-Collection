// require stuff
const express = require("express")

const Event = require("../models/events")
const router = express.Router()

// -----------------------------------------------------------
// INDEX
router.get("/", async (req,res) => {
    const events = await Event.find()
    res.render("index.ejs", {
        events: events,
        tabTitle: "All Music Festivals Collection"
    })
})

// -----------------------------------------------------------
// NEW & CREATE
// NEW
router.get("/new", (req, res) => {
    res.render("new.ejs", {
        tabTitle: "Add New Festival"
    })
})

// CREATE
router.post("/", async (req, res) => {
    try{
        await Event.create(req.body)
        res.redirect("/events")
    }
    catch{
        res.redirect("/events/new")
    }
})

// -----------------------------------------------------------
// EDIT & UPDATE
// EDIT
router.get("/:id/edit", async(req,res) => {
    const event = await Event.findById(req.params.id)
    res.render("edit.ejs", {
        event: event,
        tabTitle: "Edit This Festival"
    })
})

// UPDATE
router.put("/:id", async(req,res) => {
    const event = await Event.findByIdAndUpdate
    (
        req.params.id,
        req.body,
        {new: true}
    )
    res.redirect(`/products/${req.params.id}`)
})

// -----------------------------------------------------------
// DELETE
// Confirm to delete
router.get("/:id/delete", async(req, res) => {
    res.render("confirm-delete.ejs", {
        id: req.params.id,
        tabTitle: "Confirmation to Delete"
    })
})
// DELETE
router.delete("/:id", async(req, res) => {
    const event = await Event.findByIdAndRemove(
        req.params.id
    )
    res.redirect("/events")
})


// -----------------------------------------------------------
// SHOW
router.get("/:id", async () => {
    // populate("user") -> display user's info
    const event = await Event.findById(req.params.id).populate("user")
    res.render("show.ejs", {
        event: event,
        tabTitle: event.title
    })
})

// -----------------------------------------------------------
// export
module.exports = router