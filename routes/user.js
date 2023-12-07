import express from "express";
import userController from '../controllers/UserController.js';
const router = express.Router();

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:userId', userController.getUserById);

// Update user by ID
router.patch('/:userId', userController.updateUser);

// Delete user by ID
router.delete('/:userId', userController.deleteUser);

router.get('/email/:userEmail', userController.getUserByEmail);

export default router;

