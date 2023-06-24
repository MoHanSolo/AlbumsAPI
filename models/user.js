const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(`${this.password}${this.secret}`, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, secret)
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User