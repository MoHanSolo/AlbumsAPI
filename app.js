const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const albumRoutes = require('./routes/albumRoutes')

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/album', albumRoutes)

module.exports = app