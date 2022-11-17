'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('test echo functionality', async (t) => {
  t.test('should create an echo item', async (t) => {
    const app = build(t)

    const res = await app.inject({
      url: '/api/echo/my-first-item'
    })

    const payload = JSON.parse(res.payload)

    t.equal(payload.done, false)
    t.equal(payload.name, 'my-first-item')
    t.notSame(payload.timestamp, null)
  })

  t.test('should give 404 if requested item does not exist', async (t) => {
    const app = build(t)

    const res = await app.inject({
      url: '/api/echo/this-does-not-exist/xx'
    })

    const payload = JSON.parse(res.payload)

    t.is(res.statusCode, 404)
    t.deepEquals(payload, {
      message: 'Requested echo item does not exist'
    })
  })
})
