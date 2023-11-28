// setup auth controller with jwt and bcrypt
// ======================================================
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'

// register a new user
const register = async (req, res) => {
    const body = await req.body;
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = new User({ ...body, password: hashedPassword });
        await user.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
// login a user
const login = async (req, res) => {
    const { username, password } = await req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found. Please check your credentials and try again.',
            });
        }

        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: 'Please check your credentials and try again.'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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