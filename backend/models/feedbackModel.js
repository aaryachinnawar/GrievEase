const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true }, 
    category: { 
        type: String, 
        enum: ['Infrastructure', 'Water Facility', 'Canteen Services', 'Student Section', 'Administrative Services', 'Training & Placement Cell'], 
        required: true },
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Resolved'], 
        default: 'Pending' 
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', default: null },
    responses: [{ 
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        message: String, 
        timestamp: { type: Date, default: Date.now } 
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
