const handleError = (err, res) =>
  res.json({
    success: false,
    message: err.message,
    type: err.type
  })

module.exports = handleError
