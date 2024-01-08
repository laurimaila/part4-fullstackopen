const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('Most blogs', () => {
    test('of empty list is none', () => {
        expect(listHelper.mostBlogs([])).toEqual(null)
    })

    test('when list has only one blog, its author has the most (1) blog', () => {
        expect(listHelper.mostBlogs(helper.listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.mostBlogs(helper.listWithManyBlogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})