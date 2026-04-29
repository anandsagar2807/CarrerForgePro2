const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    subscription: {
        plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
        status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
        stripeCustomerId: String,
        stripeSubscriptionId: String,
        currentPeriodEnd: Date,
        resumeCount: { type: Number, default: 0 },
        features: {
            maxResumes: { type: Number, default: 3 },
            aiGenerations: { type: Number, default: 5 },
            atsScans: { type: Number, default: 10 },
            premiumTemplates: { type: Boolean, default: false },
            prioritySupport: { type: Boolean, default: false },
            customBranding: { type: Boolean, default: false }
        }
    },
    usage: {
        resumesCreated: { type: Number, default: 0 },
        aiGenerationsUsed: { type: Number, default: 0 },
        atsScansUsed: { type: Number, default: 0 },
        lastResetDate: { type: Date, default: Date.now }
    },
    preferences: {
        theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'light' },
        defaultTemplate: { type: String, default: 'modern' },
        notifications: {
            email: { type: Boolean, default: true },
            marketing: { type: Boolean, default: false }
        }
    },
    analytics: {
        lastLogin: Date,
        loginCount: { type: Number, default: 0 },
        totalTimeSpent: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
UserSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', UserSchema);

