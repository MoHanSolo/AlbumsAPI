const express = require('express')
const router = express.Router()
const albumsController = require('../controllers/albumsController')

// Index
router.get('/', albumsController.showAllAlbums)

// New -> for views (not using)

// Destroy or Delete
router.delete('/:id', albumsController.deleteAlbum)

// Update 
router.put('/:id', albumsController.updateAlbum)

//Create
router.post('/', albumsController.createAlbum)

// Edit -> for views (not using)

// Show
router.get('/:id', albumsController.showAlbum)

// Login


// Logout 


module.exports = router