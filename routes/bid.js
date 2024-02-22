import express from 'express';
import bidController from '../controllers/bidController.js';

const router = express.Router();

// Create a new bid
router.post('/', bidController.createBid);

router.get('/', bidController.getAllBids);
// Get a bid by bidId
router.get('/:bidId', bidController.getBid);

// Update a bid by bidId
router.put('/:bidId', bidController.updateBid);

// Delete a bid by bidId
router.delete('/:bidId', bidController.deleteBid);

export default router;