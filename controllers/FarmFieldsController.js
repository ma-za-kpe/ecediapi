import FarmFields from '../models/FarmFields.js'; // Import the FarmFields model

  // Controller method to get all farmFields
  const getAllFarmFields = async (req, res) => {
    try {
      const farmFields = await FarmFields.find();
      res.json(farmFields);
    } catch (error) {
      console.error('Error getting farmFields:', error);
      res.status(500).json({ error: 'Failed to get farmFields' });
    }
  };

  const create = async (req, res) => {
    try {
   const { name } = req.body;

   const existingfarmFields = await FarmFields.findOne({ name });

   if (existingfarmFields) {
     return res.status(400).json({ error: 'FarmFields name must be unique' });
   }

   // Create a new farmFields if the name is unique
   const newFarmFields = await FarmFields.create(req.body);
   res.status(201).json(newFarmFields);
 } catch (error) {
   console.error('Error creating farmFields:', error);
   res.status(500).json({ error: 'Failed to create farmFields' });
 }
 };

  
  // Controller method to get a specific crop by ID
  const getFarmFieldsById = async (req, res) => {
    const { id } = req.params;
    try {
      const farmFields = await FarmFields.findById(id);
      if (!farmFields) {
        return res.status(404).json({ error: 'FarmFields not found' });
      }
      res.json(farmFields);
    } catch (error) {
      console.error('Error getting farmFields by ID:', error);
      res.status(500).json({ error: 'Failed to get farmFields' });
    }
  };
  
  // Controller method to update a farmFields by ID
  const updateFarmFieldsById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedFarmFields = await FarmFields.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedFarmFields) {
        return res.status(404).json({ error: 'FarmFields not found' });
      }
      res.json(updatedFarmFields);
    } catch (error) {
      console.error('Error updating farmFields by ID:', error);
      res.status(500).json({ error: 'Failed to update farmFields' });
    }
  };
  
  // Controller method to delete a farmFields by ID
  const deleteFarmFieldsById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedFarmFields = await FarmFields.findByIdAndRemove(id);
      if (!deletedFarmFields) {
        return res.status(404).json({ error: 'farmFields not found' });
      }
      res.json({ message: 'farmFields deleted successfully' });
    } catch (error) {
      console.error('Error deleting farmFields by ID:', error);
      res.status(500).json({ error: 'Failed to delete farmFields' });
    }
  };


export default {
    create,
    getAllFarmFields,
    getFarmFieldsById,
    updateFarmFieldsById,
    deleteFarmFieldsById
};
  

