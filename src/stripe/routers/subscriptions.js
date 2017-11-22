const Joi = require('joi')
const Router = require('express').Router
const handleError = require('../../utils/handle-error')
const handleResponse = require('../../utils/handle-response')
const parseArgs = require('../../utils/parse-args')
const createStripeService = require('stripe')

// define the schemas
const planItemSchema = Joi.object().keys({
  plan: Joi.string().required()
})

const createSubscriptionSchema = Joi.object().keys({
  customer: Joi.string().required(),
  items: Joi.array()
    .items(planItemSchema)
    .required()
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

module.exports = createSubscriptionsRouter
