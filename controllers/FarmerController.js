// farmerController.js
import FarmerModel from '../models/Farmer.js';

// Controller to handle farmer-related operations
const farmerController = {
  // Create a new farmer
  createFarmer: async (req, res) => {
    try {
      const newFarmer = await FarmerModel.create(req.body);
      res.status(201).json(newFarmer);
    } catch (error) {
      console.error('Error creating farmer:', error);
      res.status(500).json({ 
        error: 'Failed to create farmer',
        message: error.message 
    });
    }
  },

  // Get all farmers
  getAllFarmers: async (req, res) => {
    try {
      const farmers = await FarmerModel.find();
      res.json(farmers);
    } catch (error) {
      console.error('Error getting farmers:', error);
      res.status(500).json({ error: 'Failed to get farmers' });
    }
  },

  // Get farmer by ID
  getFarmerById: async (req, res) => {
    const { farmerId } = req.params;
    try {
      const farmer = await FarmerModel.findById(farmerId);
      if (farmer) {
        res.json(farmer);
      } else {
        res.status(404).json({ error: 'Farmer not found' });
      }
    } catch (error) {
      console.error('Error getting farmer by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update farmer by ID
  updateFarmerById: async (req, res) => {
    const { farmerId } = req.params;
    try {
      const updatedFarmer = await FarmerModel.findByIdAndUpdate(
        farmerId,
        req.body,
        { new: true }
      );
      if (updatedFarmer) {
        res.json(updatedFarmer);
      } else {
        res.status(404).json({ error: 'Farmer not found' });
      }
    } catch (error) {
      console.error('Error updating farmer by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete farmer by ID
  deleteFarmerById: async (req, res) => {
    const { farmerId } = req.params;
    try {
      const deletedFarmer = await FarmerModel.findByIdAndDelete(farmerId);
      if (deletedFarmer) {
        res.json({ message: 'Farmer deleted successfully' });
      } else {
        res.status(404).json({ error: 'Farmer not found' });
      }
    } catch (error) {
      console.error('Error deleting farmer by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default farmerController;
// export default {
//     registerCollective,
//     loginCollective
// };
