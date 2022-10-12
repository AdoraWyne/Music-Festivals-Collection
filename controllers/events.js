// require stuff
const express = require("express")
const ensureLogin = require("connect-ensure-login")

const Event = require("../models/events")
const upload = require("../middlewares/upload")
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
        console.log(error);
        req.flash("error", "Unable to add")
        res.redirect("/events/new")
    }
})

// -----------------------------------------------------------
// EDIT & UPDATE
// EDIT
router.get("/:id/edit", async (req,res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) {
            throw new Error("Not Found")
        }
        res.render("edit.ejs", {
            event, // destructing from event: event,
            tabTitle: "Edit This Festival",
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
    req.flash("success", `${event.title} is deleted`)
    res.redirect("/events")
})


// -----------------------------------------------------------
// SHOW
router.get("/:id", async (req, res, next) => {
    try {
        // populate("user") -> display user's info
        const event = await Event.findById(req.params.id).populate("author")
        if (event) {
        res.render("show.ejs", {
            event,
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