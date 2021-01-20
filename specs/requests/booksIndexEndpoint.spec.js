const app = require ('../../server')
const supertest = require ('supertest')
const { expect, jsonResponse } = require('../specHelper')

let server, request, response

before(done => {
  server = app.listen(done)
  request = supertest.agent(server)
})

after(done => {
  server.close(done)
})

describe('GET /books', () => {
  beforeEach(async () => {
    response = await request.get('/books')
  })

  it('is expected to respond with status 200', () => {
    expect(response.status).to.equal(200)
  });
  it('is expected a collection of books', () => {
    const expectedBody ='{"books":[{"id":2,"author":"A. Lindgren","title":"The Adventures of Pippi Longstocking"},{"id":3,"author":"T. Ochman","title":"Getting Started with NodeJS"},{"id":7,"author":"John irving","title":"In one Person"},{"id":9,"author":"3rd try irving","title":"In 3 Person"},{"id":1,"author":"UPDATED irving","title":"UPDATED Person"}]}'
    expect(jsonResponse(response)).to.equal(expectedBody)
  });
})
