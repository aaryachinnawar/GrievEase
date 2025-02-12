const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    feedbackStats: { 
        totalFeedbacks: Number, 
        resolved: Number, 
        pending: Number, 
        inProgress: Number 
    },  
    departmentWiseStats: { type: Map, of: Number },
    generatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Report', ReportSchema);
