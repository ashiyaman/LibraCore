const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const Books = require('./model/books.models.js')

const {initializeDatabase} = require('./db/db.connect.js')
const PORT = process.env.PORT 

initializeDatabase()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Book App Server.')
})

// Add new book to db

const createBook = async(newBook) => {
    try{
        const book = new Books(newBook)
        const saveNewBooks =  await book.save()
        return saveNewBooks
    }
    catch(error){
        throw error
    }
}

app.post('/books', async (req, res) => {
    try{
        const book = await createBook(req.body)
        if(book){
            res.status(200).json({message: 'New Book added successfully.', book: book})
        }
    }
    catch(error){
        res.status(500).json({error: 'Failed to add New Book.'})
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
