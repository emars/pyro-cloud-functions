const handleError = (err, res) =>
  res.json({
    success: false,
    error: err
  })

module.exports = handleError
