const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()

const {initializeDatabase} = require('./db/db.connect.js')
const PORT = process.env.PORT 

initializeDatabase()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Book App Server.')
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
