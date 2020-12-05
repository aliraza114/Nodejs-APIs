// pkg imports
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// local imports
const feedRoutes = require('./routes/feed')

const MONGODB_URI = 'mongodb+srv://aliraza:aliraza@cluster0.g6cnw.mongodb.net/apimessaging'


const app = express()

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Orign', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

//registering routes
app.use('/feed', feedRoutes)

// general error handling 
app.use((err, req, res, next) =>{
    console.log(err)
    const status = err.statusCode || 500
    const message = err.statusCode
    res.status(status).json({
        message: message
    })
})

mongoose.connect(MONGODB_URI).then(
    app.listen(8080)
).catch(err => console.log(err))
