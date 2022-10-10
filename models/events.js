// require mongoose
const mongoose = require("mongoose")
const { Schema } = mongoose

// schema structure
const eventSchema = new Schema ({
    title: { type: String, require: true},
    location: { type: String, require: true},
    website: String,
    date: String,
    description: String,
    imageURL: String,
    category: {
        type: String,
        enum: ["Mixed genres", "Trance", "Techno", "House", "DnB", "Trap", "Hardstyle", "Others"]
    },
    rating: {type: Number, min: 0, max: 5},
    attended: Boolean,
    price: Number,
    comment: String,
    author: {type: Schema.Types.ObjectId, ref: "User"}
})

// model
const Event = mongoose.model("Event", eventSchema)

// export
module.exports = Event