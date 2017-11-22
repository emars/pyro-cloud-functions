const Joi = require('joi')
const Router = require('express').Router
const handleError = require('../../utils/handle-error')
const handleResponse = require('../../utils/handle-response')
const parseArgs = require('../../utils/parse-args')
const createStripeService = require('stripe')

// define the schemas
const createSubscriptionSchema = Joi.object().keys({
  customer: Joi.string().isRequired(),
  items: Joi.array()
    .items(planItemSchema)
    .isRequired()
})

const planItemSchema = Joi.object().keys({
  plan: Joi.string().isRequired()
})

const createSubscriptionsRouter = stripeSecret => {
  const stripe = createStripeService(stripeSecret)
  const router = new Router()

  router.post('/', parseArgs(createSubscriptionSchema), (req, res) => {
    stripe.subscriptions.create(req.args, (err, subscription) => {
      if (err) return handleError(err, res)
      handleResponse(200, subscription, res)
    })
  })

  return router
}

module.exports = createCustomersRouter
