const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')
const { request, response } = require('express')

// Create our endpoint
const app = express()

app.use(bodyParser.json()) // read into a json object
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// the GET network request - in Controller books (index)
const getBooks = (request, response, next) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    } else {
      response.status(200).json({ books: results.rows })
    }
  })
}

// create action in RAILS
const addBook = (request, response, next) => {
  const { author, title } = request.body
  pool.query(
    'INSERT INTO books (author, title) VALUES ($1, $2)',
    [author, title],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ message: 'Book was added to the db...' })
    }
  )
}

// RAILS config routes
app.route('/books').get(getBooks).post(addBook)

// Start server
app.listen(3001, () => {
  console.log('Server is up and running...')
})
