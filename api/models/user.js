const mongoose              = require('mongoose'),
      passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema ({
    password: String,
    username: String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)