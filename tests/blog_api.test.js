const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('Viewing multiple blogs', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('unique identifier is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents).toContain(helper.initialBlogs[1].title)
    })
})

describe('Adding a new blog', () => {
    test('a blog can be added', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogToBeAdded)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const blogTitles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(blogTitles).toContain(helper.blogToBeAdded.title)
    })

    test('a blog missing title or url can\'t be added', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogWithoutTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(helper.blogWithoutUrl)
            .expect(400)
    })

    test('verify likes defaults to 0 if missing', async () => {
        const response = await api.get(`/api/blogs/${helper.initialBlogs[0]._id}`)
        expect(response.body.likes).toBe(0)
    })
})

describe('Modifying single blog', () => {
    test('single blog can be deleted', async () => {
        await api
            .delete('/api/blogs/5a422a851b54a676234d17f7')
            .expect(204)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(1)
    })

    test('single blog can be updated', async () => {
        await api
            .put('/api/blogs/5a422aa71b54a676234d17f8')
            .send({ likes: 100 })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs/5a422aa71b54a676234d17f8')
        expect(response.body.likes === 100)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})