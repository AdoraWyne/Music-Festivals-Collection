// requiring
const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const {Schema} = mongoose

// Schema
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
    comment: String
})

const userSchema = new Schema({
    festCollection: eventSchema,
    wishList: [{type: Schema.Types.ObjectId, ref: "Event"}]
})

// plugin
userSchema.plugin(passportLocalMongoose)

// model
const User = mongoose.model("User", userSchema)
const Event = mongoose.model("Event", eventSchema)

// export
module.exports = User
module.exports = Event
