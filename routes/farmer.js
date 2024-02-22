import express from 'express';
import farmerController from '../controllers/FarmerController.js';

const router = express.Router();

// Routes for farmer operations
router.post('/farmers', farmerController.createFarmer);
router.get('/farmers', farmerController.getAllFarmers);
router.get('/farmers/:farmerId', farmerController.getFarmerById);
router.put('/farmers/:farmerId', farmerController.updateFarmerById);
router.delete('/farmers/:farmerId', farmerController.deleteFarmerById);

export default router;
