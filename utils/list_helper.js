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

module.exports = {
    dummy, totalLikes, favouriteBlog
}