const User = require('../models/user')
// const Album = require('../models/album')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

// authentication of user: Verifies token and checks if the user is logged in

// exports.auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const data = jwt.verify(token, secret)
//         const user = await User.findOne({ _id: data._id })
//         if (!user || user.isLoggedIn === false ) {
//             throw new Error()
//         }
//         req.user = user
//         next()
//     } catch (error) {
//         res.status(401).send('Not authorized')
//     }
// }

// show all users in database 