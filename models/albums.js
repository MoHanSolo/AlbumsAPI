const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    description: { type: String, required: true }, 
    dateReleased: { type: String, required: true },
    genre: { type: String, required: true }, 
    label: { type: String, required: true },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Album = mongoose.model('Albums', albumSchema)

module.exports = Album