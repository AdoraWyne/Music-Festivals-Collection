// require mongoose
const mongoose = require("mongoose")

// schema structure
const eventSchema = new mongoose.Schema ({
    location: { type: String, require: true},
    date: {type: Date, min: Date.now, require: true},
    title: { type: String, require: true},
    expectedAttendance: Number,
    rate: {type: Number, require: true, min: 0},
    description: String,
    availableRoles: [String],
    requirements: [String],
    vacancies: {type: Number, require: true, min: 0}
})

// model
const Event = mongoose.model("Event", eventSchema)

// export
module.exports = Event