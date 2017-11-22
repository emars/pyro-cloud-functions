const handleResponse = (statusCode, body, res) =>
  res.status(statusCode).json(body)

module.exports = handleResponse
