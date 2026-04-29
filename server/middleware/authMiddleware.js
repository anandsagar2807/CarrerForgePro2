const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

exports.checkSubscription = (req, res, next) => {
    if (req.user.subscription.plan === 'free' && req.user.subscription.resumeCount >= 1) {
        return res.status(403).json({ message: 'Free plan limit reached. Please upgrade to Pro.' });
    }
    next();
};
