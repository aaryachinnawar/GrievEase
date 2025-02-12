const express = require('express');
const { createNotification, getNotifications, markAsSeen, deleteNotification } = require('../controllers/notificationController');
const router = express.Router();

// Create a new notification
router.post('/create', createNotification);

// Get all notifications for a user
router.get('/:userId', getNotifications);

// Mark a notification as seen
router.put('/seen/:notificationId', markAsSeen);

// Delete a notification
router.delete('/:notificationId', deleteNotification);

module.exports = router;
