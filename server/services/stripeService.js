const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (userId, userEmail, plan) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: plan === 'pro' ? process.env.STRIPE_PRO_PRICE_ID : null,
            quantity: 1,
        }],
        mode: 'subscription',
        customer_email: userEmail,
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        metadata: { userId, plan }
    });
    return session;
};

exports.handleWebhook = async (sig, body) => {
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { userId, plan } = session.metadata;
        // Update user subscription in DB
        const User = require('../models/User');
        await User.findByIdAndUpdate(userId, { 
            'subscription.plan': plan,
            'subscription.stripeCustomerId': session.customer
        });
    }
};
