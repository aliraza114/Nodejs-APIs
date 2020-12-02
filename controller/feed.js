const { validationResult } = require('express-validator/check')

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

exports.createPost = ((req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(422).json({
            message: "Validation failed, entered data is incorrect",
            errors: errors.array()
        })
    }
    res.status(200).json({
        message: 'Post Created Successflly',
        posts: {
            _id: new Date().toISOString(),
            title: 'Another Post',
            content: 'Content of the post 2!',
            imageUrl: 'images/test',
            creator: {
                name: 'Ali Raza 2'
            },
            createdAt: new Date()
        }
    })
}) 