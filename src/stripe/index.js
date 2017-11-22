const express = require('express')
const cors = require('cors')
const Joi = require('joi')
const cookieParser = require('cookie-parser')

const validateFirebaseToken = require('../utils/validate-firebase-token')
const createCustomersRouter = require('./routers/customers')
const createSubscriptionsRouter = require('./routers/subscriptions')

const createStripeApp = stripeSecret => {
  const app = express()

  app.use(cors())
  app.use(cookieParser())
  //  app.use(validateFirebaseToken)
  app.use('/customers', createCustomersRouter(stripeSecret))
  app.use('/subscriptions', createSubscriptionsRouter(stripeSecret))

  return app
}

module.exports = createStripeApp
