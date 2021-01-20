const app = require('../../server')
const supertest = require('supertest')
const { expect, jsonResponse } = require('../specHelper')
const fs = require('fs')

let server, request, response

before((done) => {
  server = app.listen(done)
  request = supertest.agent(server)
})

after((done) => {
  server.close(done)
})

describe('GET /books/:id', () => {
  beforeEach(async () => {
    response = await request.get('/books/1')
  })

  it('is expected to respond with status 200', () => {
    expect(response.status).to.equal(200)
  })
  it('is expected a specific book', () => {
    const expectedBody = JSON.parse(
      fs
        .readFileSync(process.cwd() + '/specs/fixtures/singleBook.json')
        .toString()
    )
    expect(jsonResponse(response)).to.equal(JSON.stringify(expectedBody))
  })
})

// ='{"book":{"id":1,"author":"UPDATED irving","title":"UPDATED Person"}}'
