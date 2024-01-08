const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('Most likes', () => {
    test('of empty list is none', () => {
        expect(listHelper.mostLikes([])).toEqual(null)
    })

    test('when list has only one blog, its author has the most likes', () => {
        expect(listHelper.mostLikes(helper.listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.mostLikes(helper.listWithManyBlogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})