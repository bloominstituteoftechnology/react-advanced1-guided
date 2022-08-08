// TODO
// TODO
// TODO
const { setupServer } = require('msw/node')
const { rest } = require('msw')

function catchAll(req, res, ctx) {
  const message = `Endpoint [${req.method}] /${req.params['0']} does not exist`
  return res(
    ctx.status(404),
    ctx.json({ message }),
  )
}

const handlers = [
  rest.all('http://localhost:9000/*', catchAll),
]

module.exports = setupServer(...handlers)
