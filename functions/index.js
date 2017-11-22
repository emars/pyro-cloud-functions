const functions = require('firebase-functions')
const pyroCloudFunctions = require('..')

console.log(functions.config())
const stripeSecretKey = functions.config().stripe.secret
exports.stripe = functions.https.onRequest(
  pyroCloudFunctions.mountStripe(stripeSecretKey)
)
