// require('dotenv').config()
// const request = require('supertest')
// const mongoose = require('mongoose')
// const { MongoMemoryServer } = require('mongodb-memory-server')
// const app = require('../app')
// // const server = app.listen(8080, () => {
// //   console.log('Testing on port 8080')
// // })
// const Album = require('../models/albums')
// let mongoServer

// beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create()
//     await mongoose.connect(mongoServer.getUri())
// })

// afterAll(async () => {
//     await mongoose.connection.close()
//     mongoServer.stop()
//     // server.close()
// })

// describe('Test album endpoints', () => {
//     test('Creates a new album', async() => {
//         const response = await request(app)
//             .post('/albums')
//             .send({
//                 title: 'Abbey Road',
//                 artist: 'The Beatles',
//                 description: 'Classic Beatles album recorded by the four from Liverpool', 
//                 dateReleased: '1969',
//                 genre: 'Rock, Folk', 
//                 label: 'Apple Records'
//             })
//         expect(response.statusCode).toBe(200)
//         expect(response.body.album.title).toEqual('Abbey Road')
//         expect(response.body.album.artist).toEqual('The Beatles')
//         expect(response.body.album.description).toEqual('Classic Beatles album recorded by the four from Liverpool')
//         expect(response.body.album.dateReleased).toEqual('1969')
//         expect(response.body.album.genre).toEqual('Rock, Folk')
//         expect(response.body.album.label).toEqual('Apple Records')
//     })
    
// })