var mongoose = require('./connection')

var userSchema = mongoose.Schema({
    
    username: String,
    firstname:String,
    email: String,
    password: String,
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;