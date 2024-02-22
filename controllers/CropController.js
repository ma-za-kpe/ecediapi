import CropModel from '../models/Crop.js';

// Controller method to create a new crop
const createCrop = async (req, res) => {
     try {
    const { name } = req.body;

    // Check if a crop with the same name already exists
    const existingCrop = await CropModel.findOne({ name });

    if (existingCrop) {
      return res.status(400).json({ error: 'Crop name must be unique' });
    }

    // Create a new crop if the name is unique
    const newCrop = await CropModel.create(req.body);
    res.status(201).json(newCrop);
  } catch (error) {
    console.error('Error creating crop:', error);
    res.status(500).json({ error: 'Failed to create crop' });
  }
  };

  async function addCategoriesToCrop(req, res) {
    const { cropId } = req.params; // Assuming cropId is part of the URL parameters
  const {fcat, chance, time, heavy, advise } = req.body;

  try {
    // Find the existing crop by its ID
    const existingCrop = await CropModel.findById(cropId);

    if (!existingCrop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    // Check if the category with the provided ID already exists
    const isCategoryUnique = existingCrop.categories.every(
      (category) => category.fcat !== fcat
    );

    if (!isCategoryUnique) {
      return res.status(400).json({ error: 'Category ID must be unique' });
    }

    // Add the new category to the existing crop
    const newCategory = {
      fcat,
      chance,
      time,
      heavy,
      advise,
    };

    existingCrop.categories.push(newCategory);

    // Save the updated crop to the database
    const updatedCrop = await existingCrop.save();

    // Respond with the updated crop
    res.json(updatedCrop);
  } catch (error) {
    if (error.name === 'ValidationError') {
        // Handle validation error (e.g., exceeding max value for fcat)
        const validationErrors = Object.values(error.errors).map((error) => error.message);
        return res.status(400).json({ error: 'Validation failed', validationErrors });
      }
  
    console.error('Error adding category to crop:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  
  // Controller method to get all crops
  const getAllCrops = async (req, res) => {
    try {
      const crops = await CropModel.find();
      res.json(crops);
    } catch (error) {
      console.error('Error getting crops:', error);
      res.status(500).json({ error: 'Failed to get crops' });
    }
  };
  
  // Controller method to get a specific crop by ID
  const getCropById = async (req, res) => {
    const { id } = req.params;
    try {
      const crop = await CropModel.findById(id);
      if (!crop) {
        return res.status(404).json({ error: 'Crop not found' });
      }
      res.json(crop);
    } catch (error) {
      console.error('Error getting crop by ID:', error);
      res.status(500).json({ error: 'Failed to get crop' });
    }
  };
  
  // Controller method to update a crop by ID
  const updateCropById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedCrop = await CropModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedCrop) {
        return res.status(404).json({ error: 'Crop not found' });
      }
      res.json(updatedCrop);
    } catch (error) {
      console.error('Error updating crop by ID:', error);
      res.status(500).json({ error: 'Failed to update crop' });
    }
  };
  
  // Controller method to delete a crop by ID
  const deleteCropById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCrop = await CropModel.findByIdAndRemove(id);
      if (!deletedCrop) {
        return res.status(404).json({ error: 'Crop not found' });
      }
      res.json({ message: 'Crop deleted successfully' });
    } catch (error) {
      console.error('Error deleting crop by ID:', error);
      res.status(500).json({ error: 'Failed to delete crop' });
    }
  };

export default {
    createCrop,
    getAllCrops,
    getCropById,
    updateCropById,
    deleteCropById,
    addCategoriesToCrop
};
  