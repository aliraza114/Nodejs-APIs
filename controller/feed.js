// packages imports
const fs = require('fs')
const path = require('path')

const { validationResult } = require('express-validator/check')

// local imports
const Post = require('../models/post')



// get all posts
exports.getPosts = (req, res, next) => {
    Post.find(posts => {
        res.status(200).json({ message: 'Post Fetched Successfully!', posts: posts })
    }).then().catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}
// create post
exports.createPost = ((req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        const error = new Error('Validation failed, entered data is incorrect!')
        error.statusCode = 422
        throw error
    }
    if (!req.file) {
        const error = new Error('Please provdie image!')
        error.statusCode = 422
        throw error
    }

    const title = req.body.title
    const content = req.body.content
    const imageUrl = req.file.path

    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
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
        then(post => {
            if (!post) {
                const error = new Error('Could not find post!')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({ message: 'Post fetched!', post: post })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.updatePost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        const error = new Error('Validation failed, entered data is incorrect!')
        error.statusCode = 422
        throw error
    }
    const postId = req.params.postId
    const title = req.body.title
    const content = req.body.content
    let imageUrl = req.body.image
    if (req.file) {
        imageUrl = req.file.path
    }
    if (!imageUrl) {
        const error = new Error('No file Picked!')
        error.statusCode = 422
        throw error
    }
    Post.findById(postId).then(post => {
        if (!post) {
            const error = new Error('Could not find post!')
            error.statusCode = 404
            throw error
        }
        if(imageUrl !== post.imageUrl){
            clearImage(post.imageUrl)
        }
        post.title = title
        post.content = content
        post.imageUrl = imageUrl
        return post.save()
    }).then(result => {
        res.statusCode(200).json({message: 'Post Updated!', post: result})
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '../', filePath)
    fs.unlink(filePath, err =>{
        console.log(err)
    })
}