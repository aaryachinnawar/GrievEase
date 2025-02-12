const express = require('express');
const {register, login} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user-auth', (req, res) => {
    res.json({ success: true, message: 'You are authorized' });
});

module.exports = router;