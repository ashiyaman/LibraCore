const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

const initializeDatabase = async () => {
    await mongoose
        .connect(MONGODB_URI)
        .then(() => console.log('Connected to Database'))
        .catch((error) => console.log('Error connecting to Database'))
}

module.exports = {initializeDatabase}