const Notification = require('../models/notificationModel');

// Create a new notification
const createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;

        const notification = new Notification({
            userId,
            message
        });

        await notification.save();
        return res.status(201).json({ message: 'Notification created successfully', notification });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get all notifications for a user
const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json(notifications);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

// Mark a notification as seen
const markAsSeen = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        notification.seen = true;
        await notification.save();

        return res.status(200).json({ message: 'Notification marked as seen', notification });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndDelete(notificationId);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        return res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { createNotification, getNotifications, markAsSeen, deleteNotification };
