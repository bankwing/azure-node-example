'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('test echo functionality', async (t) => {
  t.test('should create an echo item', async (t) => {
    const app = build(t)

    const auth = await app.inject({
      url: '/api/auth/token',
      method: 'POST',
      payload: { username: 'dummy', password: 'dummy' }
    })

    const { token } = JSON.parse(auth.payload)

    const res = await app.inject({
      url: '/api/echo/my-first-item',
      headers: { Authorization: `Bearer ${token}` }
    })

    const payload = JSON.parse(res.payload)

    t.is(payload.done, false)
    t.is(payload.name, 'my-first-item')
    t.notSame(payload.timestamp, null)
  })
})
