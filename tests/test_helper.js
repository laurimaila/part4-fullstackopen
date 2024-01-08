const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    },
]

const blogToBeAdded = {
    _id: '5a422aa71b54a845214d17f8',
    title: 'Blog added in test',
    author: 'Lauri Maila',
    url: 'http://google.fi',
    likes: 100,
    userId: '659b69ed8d0cf2c89bd0a9db',
    __v: 0
}

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    }
]

const blogWithoutTitle = {
    _id: '5a422aa71b54a845999d17f8',
    author: 'Lauri Maila',
    url: 'http://google.de',
    likes: 69,
    userId: '659b69ed8d0cf2c89bd0a9db',
    __v: 0
}

const blogWithoutUrl = {

    _id: '5a422aa71b54a845999d17f8',
    title: 'Blog without url',
    author: 'Mauri Laila',
    likes: 42,
    userId: '659b69ed8d0cf2c89bd0a9db',
    __v: 0
}

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const listWithManyBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        userId: '659b69ed8d0cf2c89bd0a9db',
        __v: 0
    }
]

module.exports = {
    initialBlogs, nonExistingId, blogsInDb,
    blogWithoutTitle, blogWithoutUrl, listWithOneBlog,
    listWithManyBlogs, blogToBeAdded, usersInDb
}