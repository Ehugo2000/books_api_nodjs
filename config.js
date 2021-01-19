require('dotenv').config() //importing packages with strings

const { Pool } = require('pg')

// Set up PostgreSQL connection
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE

// specific protocol to talk to db
const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`

//constructor
const pool = new Pool({
  connectionString: connectionString,
  ssl: false,
})

module.exports = { pool }
