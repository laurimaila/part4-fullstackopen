const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

let testToken = null

beforeAll(async () => {
    testToken = await helper.userInit()
})

describe("Viewing multiple blogs", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs")

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test("blogs are returned as JSON", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("unique identifier is named id", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body[0].id).toBeDefined()
    })

    test("a specific blog is returned", async () => {
        const response = await api.get("/api/blogs")

        const contents = response.body.map(r => r.title)
        expect(contents).toContain(helper.initialBlogs[1].title)
    })
})

describe("Adding a new blog", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test("a blog can be succesfully added", async () => {
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${testToken}`)
            .send(helper.blogToBeAdded)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const response = await api.get("/api/blogs")
        const blogTitles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(3)
        expect(blogTitles).toContain(helper.blogToBeAdded.title)
    })

    test("adding a blog fails without authorization", async () => {
        await api
            .post("/api/blogs")
            .send(helper.blogToBeAdded)
            .expect(401)
    })

    test("adding a blog w/o title or url fails", async () => {
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${testToken}`)
            .send(helper.blogWithoutTitle)
            .expect(400)

        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${testToken}`)
            .send(helper.blogWithoutUrl)
            .expect(400)
    })

    test("likes defaults to 0 if not specified", async () => {
        const response = await api.get(`/api/blogs/${helper.initialBlogs[0]._id}`)
        expect(response.body.likes).toBe(0)
    })
})

describe("Modifying blogs", () => {
    test("a blog can be deleted", async () => {
        const res = await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${testToken}`)
            .send(helper.blogToBeAdded)
            .expect(201)

        await api
            .delete(`/api/blogs/${res.body.id}`)
            .set("Authorization", `Bearer ${testToken}`)
            .expect(204)
    })

    test("deleting a blog w/o auth fails", async () => {
        const res = await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${testToken}`)
            .send(helper.blogToBeAdded)
            .expect(201)

        await api
            .delete(`/api/blogs/${res.body.id}`)
            .expect(401)
    })

    test("blogs can be updated", async () => {
        await api
            .put("/api/blogs/5a422aa71b54a676234d17f8")
            .send({ likes: 100 })
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const response = await api.get("/api/blogs/5a422aa71b54a676234d17f8")
        expect(response.body.likes === 100)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})