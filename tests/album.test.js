require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const Album = require('../models/albums')
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    // server.close()
})

const callTokenUser = async () => {
    const user = new User({
        firstName: 'Bart',
        lastName: 'Simpson',
        email: 'elbarto@email.com',
        password: 'evergreenterrece',
        isLoggedIn: true
    })
    await user.save()
    const token = await user.generateAuthToken()
    return { user, token }
} 

describe('Test album endpoints', () => {
    test('Creates a new album', async() => {
        let { user, token } = await callTokenUser()

            const response = await request(app)
                .post('/albums')
                .send({
                    title: 'Abbey Road',
                    artist: 'The Beatles',
                    description: 'Classic Beatles album recorded by the four from Liverpool', 
                    dateReleased: '1969',
                    genre: 'Rock, Folk', 
                    label: 'Apple Records',
                    user: user._id,
                })
                .set('Authorization', `Bearer ${token}`)

                expect(response.statusCode).toBe(200)
                expect(response.body.title).toEqual('Abbey Road')
                expect(response.body.artist).toEqual('The Beatles')
                expect(response.body.description).toEqual('Classic Beatles album recorded by the four from Liverpool')
                expect(response.body.dateReleased).toEqual('1969')
                expect(response.body.genre).toEqual('Rock, Folk')
                expect(response.body.label).toEqual('Apple Records')
            })

    test('Updates an album', async () => {
           let { user, token } = await callTokenUser()

           const newAlbum = new Album({
                title: 'The Rush',
                artist: 'Tammpala',
                description: 'Good album',
                dateReleased: '2022',
                genre: 'Trippy, Trance-rock',
                label: 'Island Records',
                user: user._id
           })
           await newAlbum.save()

           const updateAlbum = {
                title: 'The Slow Rush',
                artist: 'Tame Impala',
                description: 'Fourth studio album by Tame Impala. The artist takes you on a personal journey reflecting on growth, love, and loss',
                dateReleased: '2020',
                genre: 'Psychedlic pop, Prog-pop',
                label: 'Interscope Records',
                user: user._id
           }
           const response = await request(app)
           .put(`/albums/${newAlbum._id}`)
           .set('Authorization', `Bearer ${token}`)
           .send(updateAlbum)
           

           expect(response.statusCode).toBe(200)
           expect(response.body.title).toEqual('The Slow Rush')
           expect(response.body.artist).toEqual('Tame Impala')
           expect(response.body.description).toEqual('Fourth studio album by Tame Impala. The artist takes you on a personal journey reflecting on growth, love, and loss')
           expect(response.body.dateReleased).toEqual('2020')
           expect(response.body.genre).toEqual('Psychedlic pop, Prog-pop')
           expect(response.body.label).toEqual('Interscope Records')
        })
    
    test('Deletes an album in users collection', async () => {
        let { user, token } = await callTokenUser()

        const album = new Album({
            title: 'Mellon Collie And The Infinite Sadness',
            artist: 'The Smashing Pumpkins', 
            description: 'Rainy day album', 
            dateReleased: '1995',
            genre: 'Alternative, Alternative-Rock', 
            label: 'Virgin Records',
            user: user._id
        })
        const saveAlbum = await album.save()

        const response = await request (app)
        .delete(`/albums/${saveAlbum._id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(204)

        const deleteAlbum = await Album.findById(saveAlbum._id)
        expect(deleteAlbum).tobeNull
    })

    test('Returns a list of albums in a users collection', async () => {
        let { user, token } = await callTokenUser()
        const album = new Album({
            title: 'Mr. Morale & the Big Steppers',
            artist: 'Kendrick Lamar',
            description: 'Fifth studio album by American rapper Kendrick Lamar. This is Kendrick Lamars final album with the label TDE',
            dateReleased: '2022',
            genre: 'Hip-hop, Rap, Conscious hip-hop',
            label: 'Top Dawg Entertainment',
            user: user._id
        })
        await album.save()
        user.albums.addToSet(album._id)
        await user.save()
        const response = await request(app).get('/albums')
        .set('Authorization', `Bearer ${token}`)
        console.log(response.body)
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).toHaveProperty('title')
    })

    test('Returns a specific album in a users collection', async () => {
        let { user, token } = await callTokenUser()
        
        const album = new Album({
                title: 'Mr. Morale & the Big Steppers',
                artist: 'Kendrick Lamar',
                description: 'Fifth studio album by American rapper Kendrick Lamar. This is Kendrick Lamars final album with the label TDE',
                dateReleased: '2022',
                genre: 'Hip-hop, Rap, Conscious hip-hop',
                label: 'Top Dawg Entertainment',
                user: user._id
            })
            await album.save()
            const response = await request(app).get(`/albums/${album._id}`)
            
            
            .set('Authorization', `Bearer ${token}`)

            console.log(response.body)

            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('album')
        })
    
})