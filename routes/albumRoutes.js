const express = require('express')
const router = express.Router()
const albumsController = require('../controllers/albumsController')
const userController = require('../controllers/userController')

// Index
router.get('/', userController.auth, albumsController.showAllAlbums)

// New -> for views (not using)

// Destroy or Delete
router.delete('/:id', userController.auth, albumsController.deleteAlbum)

// Update 
router.put('/:id', userController.auth, albumsController.updateAlbum)

//Create
router.post('/', userController.auth, albumsController.createAlbum)

// Edit -> for views (not using)

// Show
router.get('/:id', userController.auth, albumsController.showAlbum)

// Login


// Logout 


module.exports = router