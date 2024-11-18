const express = require("express");
const router = express.Router();
const { initiateContribution, paymentWebhook } = require("../controllers/paymentController");

// Middleware for parsing raw JSON if needed for webhook verification
// Only apply this to the /payment-webhook route if required by LemonSqueezy's webhook format
router.post('/payment-webhook', express.raw({ type: 'application/json' }), paymentWebhook);

// Route for initiating a contribution and creating a LemonSqueezy checkout session
router.post('/initiate-contribution', initiateContribution);

// Webhook route to handle payment status updates from LemonSqueezy
// Optionally, add middleware or logic in `paymentWebhook` to verify the webhook source
router.post('/payment-webhook', paymentWebhook);

module.exports = router;
