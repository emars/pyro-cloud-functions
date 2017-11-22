const Joi = require('joi')
const handleResponse = require('./handle-response')
const HTTP_UNPROCESSABLE_ENTITY = 422

const argumentError = handleResponse.bind(this, HTTP_UNPROCESSABLE_ENTITY)
const parseArgs = schema => (req, res, next) => {
  const argObj = req.method === 'GET' ? req.query : req.body
  const { error, value } = Joi.validate(argObj, schema)
  if (error === null) {
    req.args = value
    next()
  } else {
    const errorMessage = error.details.reduce(
      (prev, curr) => prev + `, ${curr.message}`,
      ''
    )

    argumentError(
      {
        success: false,
        error: `Incorrect Arguments to function: ${errorMessage}`
      },
      res
    )
  }
}
