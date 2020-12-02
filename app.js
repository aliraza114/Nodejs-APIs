// pkg imports
const express = require('express')

// local imports
const feedRoutes = require('./routes/feed')

const app = express()

//registering routes
app.use('/feed', feedRoutes)

app.listen(8080)