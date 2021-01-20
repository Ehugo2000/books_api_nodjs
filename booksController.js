const { pool } = require('./config')

// the GET network request - in Controller books (index)
const booksController = {
  async index(request, response, next) {
    const { rows } = await pool.query('SELECT * FROM books')
    response.status(200).json({ books: rows })
  },

  // index(request, response, next) {
  //   pool.query('SELECT * FROM books', (error, results) => {
  //     if (error) {
  //       throw error
  //     } else {
  //       response.status(200).json({ books: results.rows })
  //     }
  //   })

  // create action in RAILS
  async create(request, response, next) {
    const { author, title } = request.body
    await pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [
      author,
      title,
    ])
    response.status(201).json({ message: 'Book was added to the db...' })
  },

  async show(request, response, next) {
    const { id } = request.params
    const {
      rows,
    } = await pool.query('SELECT * FROM books WHERE id = $1 LIMIT 1', [id])
    response.status(200).json({ book: rows[0] })
  },

  async delete(request, response, next) {
    const { id } = request.params
    const { rows } = await pool.query('DELETE FROM books WHERE id = $1', [id])
    response.status(202).json({ message: 'Your wish is my command' })
  },

  async update(request, response, next) {
    const { author, title } = request.body
    const { id } = request.params
    const { rows } = await pool.query(
      `UPDATE books
      SET author = $1, title = $2
      WHERE id = $3
      RETURNING *
      `,
      [author, title, id]
    )
    response
      .status(201)
      .json({ message: 'The book was updated in the db...' })
  }
}



// pool.query(
//   'INSERT INTO books (author, title) VALUES ($1, $2)',
//   [author, title],
//   (error) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).json({ message: 'Book was added to the db...' })
//   }
// )

module.exports = { booksController }
