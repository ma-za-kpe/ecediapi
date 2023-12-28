import express from 'express';
import cropController from '../controllers/CropController.js';

const router = express.Router();

router.post('/crops', cropController.createCrop);
router.get('/crops', cropController.getAllCrops);
router.get('/crops/:id', cropController.getCropById);
router.put('/crops/:id', cropController.updateCropById);
router.patch('/crops/:cropId/categories', cropController.addCategoriesToCrop);
router.delete('/crops/:id', cropController.deleteCropById);

export default router;