const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(
        (acc, currentBlog) => {
            return acc + currentBlog.likes
        }, 0
    )
}

const favouriteBlog = (blogs) => {
    if (blogs === undefined || blogs.length == 0) {
        return null
    }

    const favourite = blogs.reduce(
        (prev, currentBlog) => {
            return (prev.likes > currentBlog.likes) ? prev : currentBlog
        }
    )

    delete favourite._id;
    delete favourite.url;
    delete favourite.__v;

    return favourite
}

const mostBlogs = (blogs) => {
    if (blogs === undefined || blogs.length == 0) {
        return null
    }

    const store = {}
    blogs.forEach((blog) => store[blog.author] ? store[blog.author] += 1 : store[blog.author] = 1)
    mostBlogsAuthor = Object.keys(store).sort((a, b) => store[b] - store[a])[0]
    return {author: mostBlogsAuthor, blogs: store[mostBlogsAuthor]}
}

const mostLikes = (blogs) => {
    if (blogs === undefined || blogs.length == 0) {
        return null
    }

    const store = {}
    blogs.forEach((blog) => store[blog.author] ? store[blog.author] += blog.likes : store[blog.author] = blog.likes)
    mostLikesAuthor = Object.keys(store).sort((a, b) => store[b] - store[a])[0]
    return {author: mostLikesAuthor, likes: store[mostLikesAuthor]}
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}