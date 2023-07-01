const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

// authentication of user: Verifies token and checks if the user is logged in

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, secret)
        const user = await User.findOne({ _id: data._id })
        if (!user || user.isLoggedIn === false ) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send('Not authorized')
    }
}

// show all users in database 

exports.showAllUsers = async (req, res) => {
    try {
        const foundUsers = await User.find({})
        res.json({ users: foundUsers })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// show user specified by id parameter

exports.showUser = async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id })
        res.json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// create a new user 

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// update a user specified by id

exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const user = await User.findOne({ _id: req.params.id })
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// delete a user specified by an id

exports. deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({ message: 'User deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// login the user and create token

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            res.status(400).send('Invalid user credentials')
        } else {
            const token = await user.generateAuthToken()
            user.isLoggedIn = true
            await user.save()
            res.json({ user, token })
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

// logout the user 

exports.logoutUser = async (req, res) => {
    try {
        const user = req.user
        user.isLoggedIn = false
        await user.save()
        res.json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}