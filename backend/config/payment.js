const express = require('express');
const stripe = require('stripe')('sk_test_51Ol7OkSFOvFxVpY9ie7lKzfXpyPzT5dFnu0HXk6gq12M6BV2jZTaIxp9CwUqQwJshC0xrnBeEn3ofNnNBMtyhtes00UvtHhMjY');
const calculateOrderAmount = (items) => {
    return 1400;
};

const router = express.Router();

router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router;
