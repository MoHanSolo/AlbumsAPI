const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true},
    password: { type: String, required: true},
    isLoggedIn: Boolean,
    albums: [{
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }]
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(`${this.password}${secret}`, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, secret)
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User