// require mongoose
const mongoose = require("mongoose")

// schema structure
const eventSchema = new mongoose.Schema ({
    title: { type: String, require: true},
    location: { type: String, require: true},
    website: String,
    date: String,
    description: String,
    imageURL: String,
    category: String,
    rating: String, //Number?
    attended: Boolean,
    price: Number,
    comment: String
})

// model
const Event = mongoose.model("Event", eventSchema)

// export
module.exports = Event