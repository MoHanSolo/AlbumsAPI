require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => {
    console.log('Testing on port 8080')
})
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})


describe('Test user endpoints', () => {
    test('Creates a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                firstName: 'Bart',
                lastName: 'Simpson',
                email: 'elbarto@email.com',
                password: 'evergreenterrece',
                isLoggedIn: true
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.firstName).toEqual('Bart')
        expect(response.body.user.lastName).toEqual('Simpson')
        expect(response.body.user.email).toEqual('elbarto@email.com')
        expect(response.body.user.isLoggedIn).toEqual(true)
        expect(response.body).toHaveProperty('token')
    })

    test('Logs in a user', async () => {
        const user = new User({
            firstName: 'Lisa',
            lastName: 'Simpson',
            email: 'lisatheactivist@email.com',
            password: 'saxophone',
            isLoggedIn: false
        })
        await user.save()

        const response = await request(app)
            .post('/users/login')
            .send({ email: 'lisatheactivist@email.com', password: 'saxophone' })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.firstName).toEqual('Lisa')
        expect(response.body.user.lastName).toEqual('Simpson')
        expect(response.body.user.email).toEqual('lisatheactivist@email.com')
        expect(response.body.user.isLoggedIn).toEqual(true)
        expect(response.body).toHaveProperty('token')
    })

    test('Updates a user', async () => {
        const user = new User({
            firstName: 'Homer',
            lastName: 'Simpson',
            email: 'homerunhomer@email.com',
            password: 'duff',
            isLoggedIn: true
        })

        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .put(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ firstName: 'Ned', lastName: 'Flanders', email: 'praisebetohe@email.com' })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.firstName).toEqual('Ned')
        expect(response.body.user.lastName).toEqual('Flanders')
        expect(response.body.user.email).toEqual('praisebetohe@email.com')
    })

    test('Deletes a user', async () => {
        const user = new User({
            firstName: 'Seymour',
            lastName: 'Skinner',
            email: 'principleskinner@email.com',
            password: 'kruhbople',
            isLoggedIn: true
        })

        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User deleted')
    })

    test('Shows all users', async () => {
        const response = await request(app).get('/users')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('users')
    })

    test('Logs a user out', async () => {
        const user = new User({
            firstName: 'Moe',
            lastName: 'Syzlck',
            email: 'bsharps@email.com',
            password: 'barkeep',
            isLoggedIn: true
        })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .send(user)

        expect(response.statusCode).toBe(200)
        expect(response.body.user.isLoggedIn).toEqual(false)
    })

    test('Returns a user by id', async () => {
            const user = new User({
                firstName: 'Otto',
                lastName: 'Bus', 
                email: 'ottoman@email.com',
                password: 'rockonman',
                isLoggedIn: true
            })
            await user.save()
            const response = await request(app).get(`/users/${user._id}`)
            // console.log(response.body)
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('user')
    })
})