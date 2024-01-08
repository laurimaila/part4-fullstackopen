const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('Total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(helper.listWithManyBlogs)).toBe(36)
    })
})