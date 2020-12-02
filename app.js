// pkg imports
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// local imports
const feedRoutes = require('./routes/feed')

const MONGODB_URI = 'mongodb+srv://aliraza:aliraza@cluster0.g6cnw.mongodb.net/onlineshop'

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Orign', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

//registering routes
app.use('/feed', feedRoutes)

mongoose.connect(MONGODB_URI).then(
    app.listen(8080)
).catch(err => console.log(err))
