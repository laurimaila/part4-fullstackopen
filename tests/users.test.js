const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const api = supertest(app)
const helper = require("./test_helper")


beforeAll(async () => {
    await helper.userInit()
})

describe("Error when trying to create invalid users", () => {
    test("Creating user without username causes error", async () => {

        const noUsername = {
            name: "name",
            password: "password"
        }

        await api
            .post("/api/users")
            .send(noUsername)
            .expect(400)
    })

    test("Creating user with invalid password causes error", async () => {

        const invalidPassword = {
            username: "username",
            name: "name",
            password: "pa"
        }

        await api
            .post("/api/users")
            .send(invalidPassword)
            .expect(400)
    })
})

describe("when there is initially one user at db", () => {
    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "notInUse",
            name: "name",
            password: "password",
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test("creation fails with proper statuscode and message if username already taken", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "test",
            name: "name",
            password: "password",
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("expected `username` to be unique")

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
