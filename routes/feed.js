// pkg imports
const express = require('express')
const { body } = require('express-validator/check')


// local imports
const feedController = require('../controller/feed')

const router = express.Router()
// getting all posts
router.get('/posts', feedController.getPosts)
// creating a post
router.post('/post', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
], feedController.createPost)

// for getting single post data
router.get('/post/:postId', feedController.getPost)

//for updating the post data
router.put('/post/:postId', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
], feedController.updatePost)

router.delete('/post/:postId', feedController.deletePost)

module.exports = router