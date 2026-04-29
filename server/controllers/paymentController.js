const stripeService = require('../services/stripeService');

exports.createCheckoutSession = async (req, res) => {
    try {
        const { plan } = req.body;
        const session = await stripeService.createCheckoutSession(req.user.id, req.user.email, plan);
        res.json({ id: session.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.handleWebhook = async (req, res) => {
    try {
        const sig = req.headers['stripe-signature'];
        await stripeService.handleWebhook(sig, req.body);
        res.status(200).send('Webhook handled');
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};
