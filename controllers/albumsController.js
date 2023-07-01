const Album = require('../models/albums')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

// show all albums in database

exports.showAllAlbums = async (req, res) => {
    try {
        const foundAlbums = await Album.find({})
        res.json({ Albums: foundAlbums })
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

exports.createAlbum = async (req, res) => {
    try {
        const album = new Album(req.body)
        await album.save()
        res.json({ album })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// update an album specified by id

exports.updateAlbum = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const album = await Album.findOne({ _id: req.params.id })
        updates.forEach(update => user[update] = req.body[update])
        await album.save()
        res.json ({ album })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// delete an album specified by an id

exports.deleteAlbum = async (req, res) => {
    try {
        await req.album.deleteOne()
        res.json({ message: 'Album deleted'})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}