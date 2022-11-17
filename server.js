// Read the .env file.
require('dotenv').config()

// Require the framework
const Fastify = require('fastify')

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require('close-with-grace')

// Instantiate Fastify with some config
const app = Fastify({
  logger: {
    level: 'info'
  },
  disableRequestLogging: true
})

app.addHook('preHandler', (req, res, done) => {
  done()
})

app.addHook('onResponse', (req, res, done) => {
  done()
})

// Register your application as a normal plugin.
// eslint-disable-next-line import/extensions
const appService = require('./app.js')

app.register(appService)

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async ({ err }) => {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall()
  done()
})

// Start listening.
app.listen({ port: process.env.PORT || 3000, host: process.env.ADDRESS || '127.0.0.1' }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
