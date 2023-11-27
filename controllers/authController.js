// setup auth controller with jwt and bcrypt
// ======================================================
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/userModel');

// register a new user
const register = async (req, res) => {
    const { person } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(person.password, 10);
        const user = await User.create({ ...person, password: hashedPassword });
        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
// login a user
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found. Please check your credentials and try again.',
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: 'Please check your credentials and try again.'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

export { register, login };