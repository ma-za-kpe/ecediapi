import Bid from '../models/BidSchema.js';

// Create a new bid
 const createBid = async (req, res) => {
  try {
    const { farmerId, orderId } = req.body;
    const bid = new Bid({ farmerId, orderId });
    const savedBid = await bid.save();
    res.status(201).json(savedBid);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bid' });
  }
};

// Get a bid by bidId
 const getBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    console.log(bidId)
    const bid = await Bid.findOne({ _id:bidId });
    if (bid) {
      res.json(bid);
    } else {
      res.status(404).json({ error: 'Bid not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bid' });
  }
};

const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bids' });
  }
};
// Update a bid by bidId
 const updateBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { farmerId } = req.body;
    const updatedBid = await Bid.findOneAndUpdate({ bidId }, { farmerId }, { new: true });
    if (updatedBid) {
      res.json(updatedBid);
    } else {
      res.status(404).json({ error: 'Bid not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update bid' });
  }
};

// Delete a bid by bidId
 const deleteBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const deletedBid = await Bid.findOneAndDelete({ bidId });
    if (deletedBid) {
      res.json(deletedBid);
    } else {
      res.status(404).json({ error: 'Bid not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bid' });
  }
};


export default {
  createBid,
  getBid,
  updateBid,
  deleteBid,
  getAllBids
}