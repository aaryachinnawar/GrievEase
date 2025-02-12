const User = require('../models/userModel'); // ✅ Fix Import
const { hashPassword, comparePassword } = require('../helpers/authHelpers');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({ 
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        return res.json({ message: 'User created successfully' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.json({ token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { register, login };
