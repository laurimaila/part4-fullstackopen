const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('Favourite blog', () => {
    test('of empty list is none', () => {
        expect(listHelper.favouriteBlog([])).toEqual(null)
    })

    test('when list has only one blog, that is the favourite blog', () => {
        expect(listHelper.favouriteBlog(helper.listWithOneBlog)).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.favouriteBlog(helper.listWithManyBlogs)).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})