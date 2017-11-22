const Joi = require('joi')
const Router = require('express').Router
const handleError = require('../../utils/handle-error')
const handleResponse = require('../../utils/handle-response')
const parseArgs = require('../../utils/parse-args')
const createStripeService = require('stripe')

// define the schemas
const createCustomerSchema = Joi.object().keys({
  email: Joi.string().required(),
  description: Joi.string(),
  source: Joi.string()
})

const updateCustomerSchema = Joi.object().keys({
  id: Joi.string().required(),
  email: Joi.string(),
  description: Joi.string(),
  source: Joi.string()
})

const createCustomersRouter = stripeSecret => {
  const stripe = createStripeService(stripeSecret)
  const router = new Router()

  router.post('/', parseArgs(createCustomerSchema), (req, res) => {
    stripe.customers.create(req.args, (err, customer) => {
      if (err) return handleError(err, res)
      handleResponse(200, customer, res)
    })
  })

  router.put('/', parseArgs(updateCustomerSchema), (req, res) => {
    const customerId = req.args.id
    const updateArguments = req.args
    delete updateArguments.id
    stripe.customers.update(customerId, updateArguments, (err, customer) => {
      if (err) return handleError(err, res)
      handleResponse(200, customer, res)
    })
  })

  return router
}

module.exports = createCustomersRouter
