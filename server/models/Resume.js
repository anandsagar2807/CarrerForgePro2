const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    data: {
        personalInfo: Object,
        education: Array,
        experience: Array,
        skills: Array,
        projects: Array,
        certifications: Array,
        languages: Array,
        awards: Array
    },
    template: { type: String, default: 'modern' },
    customization: {
        colors: {
            primary: { type: String, default: '#3b82f6' },
            secondary: { type: String, default: '#8b5cf6' },
            accent: { type: String, default: '#10b981' }
        },
        fonts: {
            heading: { type: String, default: 'Inter' },
            body: { type: String, default: 'Inter' }
        },
        spacing: { type: String, enum: ['compact', 'normal', 'relaxed'], default: 'normal' }
    },
    atsScore: {
        score: Number,
        lastChecked: Date,
        suggestions: Array,
        keywords: {
            found: Array,
            missing: Array
        }
    },
    versions: [{
        versionNumber: Number,
        data: Object,
        createdAt: { type: Date, default: Date.now },
        note: String
    }],
    analytics: {
        views: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        lastViewed: Date
    },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    tags: [String],
    isPublic: { type: Boolean, default: false },
    publicUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
ResumeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
ResumeSchema.index({ user: 1, updatedAt: -1 });
ResumeSchema.index({ publicUrl: 1 });

module.exports = mongoose.model('Resume', ResumeSchema);

