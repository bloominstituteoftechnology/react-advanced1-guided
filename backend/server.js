const express = require('express')
const cors = require('cors')
const path = require('path')
const Quote = require('./helpers')

const server = express()

server.use(express.json())

server.use(express.static(path.join(__dirname, '../dist')))

server.use(cors())

server.get('/api/quotes', async (req, res) => {
  const [status, response] = await Quote.getAll()
  res.status(status).json(response)
})

server.get('/api/quotes/:id', async (req, res) => {
  const [status, response] = await Quote.getById(req.params.id)
  res.status(status).json(response)
})

server.post('/api/quotes', async (req, res) => {
  const [status, response] = await Quote.create(req.body)
  res.status(status).json(response)
})

server.put('/api/quotes/:id', async (req, res) => {
  const [status, response] = await Quote.update(req.params.id, req.body)
  res.status(status).json(response)
})

server.patch('/api/quotes/:id', async (req, res) => {
  const [status, response] = await Quote.patch(req.params.id)
  res.status(status).json(response)
})

server.delete('/api/quotes/:id', async (req, res) => {
  const [status, response] = await Quote.remove(req.params.id)
  res.status(status).json(response)
})

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.originalUrl} does not exist`,
  })
})

module.exports = server
