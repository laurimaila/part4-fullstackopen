const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body
    if (!request.user) {
        return response.status(401).json({ error: "Must be logged in to post a blog" })
    }
    const user = await User.findById(request.user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    if (!blog.title || !blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }

})

blogsRouter.delete("/:id", async (request, response) => {
    const user = await User.findById(request.user)
    const blogToRemove = await Blog.findById(request.params.id)
    if (!user) {
        response.status(401).json({ error: "Deleting requires login" })
    }
    if (user.id.toString() !== blogToRemove.user.toString()) {
        response.status(401).json({ error: "Only the owner can delete a blog" })
    }
    user.blogs = user.blogs.concat(request.params.id)
    await user.save()
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter