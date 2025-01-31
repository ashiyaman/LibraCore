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

//Get book by its title

const readBookByTitle = async(bookTitle) => {
    try{
        const book = await Books.find({title: bookTitle})
        return book
    }
    catch(error){
        throw error
    }
}

app.get('/books/title/:bookTitle', async (req, res) => {
    try{
        const book = await readBookByTitle(req.params.bookTitle)
        if(book){
            res.send(book)
        }
        else{
            res.status(404).json({error: 'No Books found.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while fetching books.'})
    }
})

//Get book by its title

const readBookByAuthor = async(author) => {
    try{
        const book = await Books.find({author: author})
        return book
    }
    catch(error){
        throw error
    }
}

app.get('/books/author/:author', async (req, res) => {
    try{
        const book = await readBookByAuthor(req.params.author)
        if(book){
            res.send(book)
        }
        else{
            res.status(404).json({error: 'No Books found.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while fetching books.'})
    }
})

//Get book by its title

const readBookByGenre = async(genre) => {
    try{
        const book = await Books.find({genre: genre})
        return book
    }
    catch(error){
        throw error
    }
}

app.get('/books/genre/:genreName', async (req, res) => {
    try{
        const book = await readBookByGenre(req.params.genreName)
        if(book){
            res.send(book)
        }
        else{
            res.status(404).json({error: 'No Books found.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while fetching books.'})
    }
})

//Get book by its year

const readBookByYear = async(year) => {
    try{
        const book = await Books.find({publishedYear: year})
        return book
    }
    catch(error){
        throw error
    }
}

app.get('/books/year/:publishedYear', async (req, res) => {
    try{
        const book = await readBookByYear(req.params.publishedYear)
        if(book){
            res.send(book)
        }
        else{
            res.status(404).json({error: 'No Books found.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while fetching books.'})
    }
})

//Find a book by id and update its data

const updateBook = async(bookId, dataToUpdate) => {
    try{
        const book = await Books.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return book
    }
    catch(error){
        console.log(error)
        throw error
    }
}

app.post('/books/:bookId', async (req, res) => {
    try{
        const updatedBook = await updateBook(req.params.bookId, req.body)
        console.log(updatedBook)
        if(updatedBook){
            res.status(200).json({message: 'Book updated successfully', book: updatedBook})
        }
        else{
            res.status(404).json({error: 'Book does not exist.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while updating book.',})
    }
})

//Update book by its title

const updateBookByTitle = async(bookTitle, dataToUpdate) => {
    try{
        const bookToUpdate = await readBookByTitle(bookTitle)
        const book = await Books.findOneAndUpdate(bookToUpdate.id, dataToUpdate, {new: true})
        return book
    }
    catch(error){
        console.log(error)
        throw error
    }
}

app.post('/books/title/:bookTitle', async (req, res) => {
    try{
        const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body)
        if(updatedBook){
            res.status(200).json({message: 'Book updated successfully', book: updatedBook})
        }
        else{
            res.status(404).json({error: 'Book does not exist.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while updating book.',})
    }
})

//Delete book from db

const deleteBook = async(bookId) => {
    try{
        const deletedBook =await Books.findByIdAndDelete(bookId)
        return deletedBook
    }
    catch(error){
        throw error
    }
}

app.delete('/books/:bookId', async (req, res) => {
    try{
        const deletedBook = await deleteBook(req.params.bookId)
        if(deletedBook){
            res.status(200).json({message: 'Book deleted successfully', book: deletedBook})
        }
        else{
            res.status(404).json({error: 'Book not found.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while deleting book.'})
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
