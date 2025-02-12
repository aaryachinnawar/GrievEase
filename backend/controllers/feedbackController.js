const Feedback = require('../models/feedbackModel');

// Create feedback
const createFeedback = async (req, res) => {
    try {
        const { userId, category, description } = req.body;
        
        const feedback = new Feedback({
            userId,
            category,
            description
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('userId', 'name email').populate('assignedTo', 'name email');
        res.status(200).json(feedbacks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get feedback by ID
const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate('userId', 'name email').populate('assignedTo', 'name email');
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Update feedback status
const updateFeedbackStatus = async (req, res) => {
    try {
        const { status, assignedTo } = req.body;
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status, assignedTo }, { new: true });
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback updated successfully', feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Add response to feedback
const addResponse = async (req, res) => {
    try {
        const { adminId, message } = req.body;
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        feedback.responses.push({ adminId, message });
        await feedback.save();

        res.status(200).json({ message: 'Response added successfully', feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { createFeedback, getAllFeedbacks, getFeedbackById, updateFeedbackStatus, addResponse, deleteFeedback };
