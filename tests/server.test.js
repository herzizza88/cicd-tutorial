const request = require('supertest')
const app = require('../server')

app.get('/', (req, res) => {
  res.json('Hello amazing Techladies!')
})

afterAll(async () => { await app.close() })