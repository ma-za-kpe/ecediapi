import express from 'express';
import farmerFieldsController from '../controllers/FarmerFieldsController.js';

const router = express.Router();

// Create a new farmer
router.post('/farmer-fields', farmerFieldsController.create);

router.get('/farmer-fields', farmerFieldsController.getAllFarmerFields);

// Get a single farmer by ID
router.get('/farmer-fields/:id', farmerFieldsController.getFarmerFieldsById);

// Update a farmer by ID
router.put('/farmer-fields/:id', farmerFieldsController.updateFarmerFieldsById);

// Delete a farmer by ID
router.delete('/farmer-fields/:id', farmerFieldsController.deleteFarmerFieldsById);

export default router;
