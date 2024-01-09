const listHelper = require("../utils/list_helper")
const helper = require("./test_helper")


describe("Favourite blog", () => {
    test("dummy function returns one", () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })

    test("of empty list is none", () => {
        expect(listHelper.favouriteBlog([])).toEqual(null)
    })

    test("when list has only one blog, that is the favourite blog", () => {
        expect(listHelper.favouriteBlog(helper.listWithOneBlog)).toEqual(helper.listWithOneBlog[0])
    })

    test("of a bigger list is calculated right", () => {
        expect(listHelper.favouriteBlog(helper.listWithManyBlogs)).toEqual(helper.listWithManyBlogs[2])
    })
})

describe("Most blogs", () => {
    test("of empty list is none", () => {
        expect(listHelper.mostBlogs([])).toEqual(null)
    })

    test("when list has only one blog, its author has the most (1) blog", () => {
        expect(listHelper.mostBlogs(helper.listWithOneBlog)).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })

    test("of a bigger list is calculated right", () => {
        expect(listHelper.mostBlogs(helper.listWithManyBlogs)).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe("Most likes", () => {
    test("of empty list is none", () => {
        expect(listHelper.mostLikes([])).toEqual(null)
    })

    test("when list has only one blog, its author has the most likes", () => {
        expect(listHelper.mostLikes(helper.listWithOneBlog)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    test("of a bigger list is calculated right", () => {
        expect(listHelper.mostLikes(helper.listWithManyBlogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})

describe("Total likes", () => {
    test("of empty list is zero", () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test("when list has only one blog, equals the likes of that", () => {
        expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(5)
    })

    test("of a bigger list is calculated right", () => {
        expect(listHelper.totalLikes(helper.listWithManyBlogs)).toBe(36)
    })
})