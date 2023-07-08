const Album = require('../models/albums')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY





// show all albums in database

exports.showAllAlbums = async (req, res) => {
    try {
        const foundAlbums = await Album.find({user: req.user._id})
        res.json(foundAlbums)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// show album specified by id parameter

exports.showAlbum = async (req, res) => {
    try {
        const album = await Album.find({ _id: req.params.id })
        res.json({ album })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// create a new album

exports.createAlbum = async function (req, res){
    try {
        req.body.user = req.user._id
        const album = await Album.create(req.body)
        req.user.albums?
        req.user.albums.addToSet({ _id: album._id }):
        req.user.albums = [{_id: album._id }]
        await req.user.save()
        res.json(album)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// update an album specified by id

exports.updateAlbum = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const album = await Album.findOne({ _id: req.params.id })
        updates.forEach(update => album[update] = req.body[update])
        await album.save()
        res.json ( album )
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// delete an album specified by an id

exports.deleteAlbum = async function(req, res){
    try{
        const todo = await Album.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
    } catch(error){
        res.status(400).json({ message: error.message })
    }
}