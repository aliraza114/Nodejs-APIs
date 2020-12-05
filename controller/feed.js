// packages imports
const { validationResult } = require('express-validator/check')

// local imports
const Post = require('../models/post')



// get all posts
exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: {
            _id: new Date().toISOString(),
            title: 'First Post',
            content: 'Content of the post!',
            imageUrl: 'images/test',
            creator: {
                name: 'Ali Raza'
            },
            createdAt: new Date()
        }
    })
}
// create post
exports.createPost = ((req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        const errors = new Error('Validation failed, entered data is incorrect!')
        error.statusCode = 422
        throw error
        return res.status(422).json({
            message: "Validation failed, entered data is incorrect",
            errors: errors.array()
        })
    }

    const title = req.body.title
    const content = req.body.content

    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/test',
        creator: {
            name: 'Ali Raza 2'
        },
    })
    post.save().then(result => {
        res.status(201).json({
            message: 'Post Created Successflly',
            posts: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
})

exports.getPost = (req, res, next) => {
    const postId = req.params.postId
    Post.findById(postId).
        then(post =>{
            if(!post){
                const error = new Error('Could not find post!')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({message: 'Post fetched!', post: post})
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}