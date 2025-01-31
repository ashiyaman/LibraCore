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

// Api to add new book to db

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

//Api to get all books from db

const getAllBooks = async() => {
    try{
        const books = Books.find()
        return books
    }
    catch(error){
        throw error
    }
}

app.get('/books', async (req, res) => {
    try{
        const books = await getAllBooks()
        if(books){
            res.send(books)
        }
        else{
            res.status(404).json({error: 'Books not found.'})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: 'Error while fetching books from database.'})
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
