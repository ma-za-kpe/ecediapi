import FarmerFields from '../models/FarmerFields.js';

  // Controller method to get all farmerFields
  const getAllFarmerFields = async (req, res) => {
    try {
      const farmerFields = await FarmerFields.find();
      res.json(farmerFields);
    } catch (error) {
      console.error('Error getting farmerFields:', error);
      res.status(500).json({ error: 'Failed to get farmerFields' });
    }
  };

  const create = async (req, res) => {
    try {
   const { name } = req.body;

   const existingfarmerFields = await FarmerFields.findOne({ name });

  //  if (existingfarmerFields) {
  //    return res.status(400).json({ error: 'FarmerFields name must be unique' });
  //  }

   // Create a new farmerFields if the name is unique
   const newFarmerFields = await FarmerFields.create(req.body);
   res.status(201).json(newFarmerFields);
 } catch (error) {
   console.error('Error creating farmerFields:', error);
   res.status(500).json({ error: error });
 }
 };

  
  // Controller method to get a specific crop by ID
  const getFarmerFieldsById = async (req, res) => {
    const { id } = req.params;
    try {
      const farmerFields = await FarmerFields.findById(id);
      if (!farmerFields) {
        return res.status(404).json({ error: 'FarmerFields not found' });
      }
      res.json(farmerFields);
    } catch (error) {
      console.error('Error getting farmerFields by ID:', error);
      res.status(500).json({ error: 'Failed to get farmerFields' });
    }
  };
  
  // Controller method to update a farmerFields by ID
  const updateFarmerFieldsById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedFarmerFields = await FarmerFields.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedFarmerFields) {
        return res.status(404).json({ error: 'FarmerFields not found' });
      }
      res.json(updatedFarmerFields);
    } catch (error) {
      console.error('Error updating farmerFields by ID:', error);
      res.status(500).json({ error: 'Failed to update farmerFields' });
    }
  };
  
  // Controller method to delete a farmerFields by ID
  const deleteFarmerFieldsById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedFarmerFields = await FarmerFields.findByIdAndDelete(id);
      if (!deletedFarmerFields) {
        return res.status(404).json({ error: 'farmerFields not found' });
      }
      res.json({ message: 'farmerFields deleted successfully' });
    } catch (error) {
      console.error('Error deleting farmerFields by ID:', error);
      res.status(500).json({ error: 'Failed to delete farmerFields' });
    }
  };


export default {
    getAllFarmerFields,
    create,
    getFarmerFieldsById,
    updateFarmerFieldsById,
    deleteFarmerFieldsById
};
  

