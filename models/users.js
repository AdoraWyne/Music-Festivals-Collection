// requiring
const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

// declare
const {Schema} = mongoose

// schema
const userSchema = new Schema({
    wishList: [{type: Schema.Types.ObjectId, ref: "Event"}]
})

// plugin
userSchema.plugin(passportLocalMongoose)

// model
const User = mongoose.model("User", userSchema)

// export
module.exports = User
