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
router.put('/:userId', userController.updateUser);

// Delete user by ID
router.delete('/:userId', userController.deleteUser);

router.get('/email/:userEmail', userController.getUserByEmail);

router.put('/:userId/update-wallet', userController.updateWalletId);

export default router;

