const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
// const albumController = require('../controllers/albumController')

// Index
router.get('/', userController.showAllUsers)

// New -> for views (not using)

// Destroy or Delete
router.delete('/:id', userController.auth, userController.deleteUser)

// Update 
router.put('/:id', userController.auth, userController.updateUser)

//Create
router.post('/', userController.createUser)

// Edit -> for views (not using)

// Show
router.get('/:id', userController.showUser)

// Login
router.post('/login', userController.loginUser)

// Logout 
router.post('/logout', userController.logoutUser)

module.exports = router