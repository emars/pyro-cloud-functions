const express = require('express')
const cors = require('cors')
const Joi = require('joi')

const createCustomersRouter = require('./routers/customers')
const createSubscriptionsRouter = require('./routers/subscriptions')

const createStripeApp = stripeSecret => {
  const app = express()

  app.use(cors())
  app.use(validateFirebaseToken)
  app.use('/customers', createCustomersRouter(stripeSecret))
  app.post('/subscriptions', createSubscriptionsRouter(stripeSecret))

  return app
}

module.exports = createStripeApp
