const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { request, response } = require('express')
const { booksController } = require('./booksController')

// Create our endpoint
const app = express()

app.use(bodyParser.json()) // read into a json object
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// RAILS config routes
app.route('/books')
.get(booksController.index)
.post(booksController.create)

app.route('/books/:id')
.get(booksController.show)
.delete(booksController.delete)
.put(booksController.update)

// Start server
app.listen(3001, () => {
  console.log('Server is up and running...')
})

module.exports = app 
