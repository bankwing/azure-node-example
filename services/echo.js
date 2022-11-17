'use strict'

const schemas = require('../schemas/echo')

module.exports = async function (fastify, opts) {
  fastify.setNotFoundHandler(function (request, reply) {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested echo item does not exist' })
  })

  fastify.get(
    '/:name',
    { schema: schemas.findOne },
    async function (request, reply) {
      return reply.send({ name: request.params.name, done: false, timestamp: Date.now() })
    }
  )
}

module.exports.autoPrefix = '/echo'
