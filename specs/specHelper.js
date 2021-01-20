const chai = require ('chai')
const expect = chai.expect
const sinonChai = require ('sinon-chai')
const { response } = require('express')

chai.use(sinonChai)

const jsonResponse = response => {
  return JSON.stringify(response.body)
}

module.exports = { expect, jsonResponse }