const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedbacks, getFeedbackById, updateFeedbackStatus, addResponse, deleteFeedback } = require('../controllers/feedbackController');

router.post('/', createFeedback);

router.get('/', getAllFeedbacks);

router.get('/:id', getFeedbackById);

router.put('/:id/status', updateFeedbackStatus);

router.post('/:id/response', addResponse);

router.delete('/:id', deleteFeedback);

module.exports = router;
