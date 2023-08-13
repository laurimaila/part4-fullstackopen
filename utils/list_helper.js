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

module.exports = {
    dummy, totalLikes
}