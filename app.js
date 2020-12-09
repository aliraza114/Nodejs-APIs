// pkg imports
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')

// local imports
const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')

const MONGODB_URI = 'mongodb+srv://aliraza:aliraza@cluster0.g6cnw.mongodb.net/apimessaging'


const app = express()

//configuring multer
const fileStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }else {
        cb(null, false)
    }
}

app.use(bodyParser.json()) // application json
app.use(multer({storage: fileStore, fileFilter: fileFilter}).single('image'))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Orign', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

//registering routes
app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)

// general error handling 
app.use((err, req, res, next) =>{
    console.log(err)
    const status = err.statusCode || 500
    const message = err.statusCode
    const data = error.data
    res.status(status).json({
        message: message, data: data
    })
})

mongoose.connect(MONGODB_URI).then( result => {
    const server = app.listen(8080)
    const io = require('./socket').init(server)
    io.on('connection', socket =>{
        console.log('Client Connected!')
    })
}).catch(err => console.log(err))
