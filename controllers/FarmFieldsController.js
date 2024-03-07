import FarmFields from "../models/FarmFields.js"; // Import the FarmFields model

// Controller method to get all farmFields
const getAllFarmFields = async (req, res) => {
  try {
    const farmFields = await FarmFields.find().lean();
    res.json(farmFields);
  } catch (error) {
    console.error("Error getting farmFields:", error);
    res.status(500).json({ error: "Failed to get farmFields" });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const existingfarmFields = await FarmFields.findOne({ name });

    // Create a new farmFields if the name is unique
    const newFarmFields = await FarmFields.create(req.body);
    res.status(201).json(newFarmFields);
  } catch (error) {
    console.error("Error creating farmFields:", error);
    res.status(500).json({ error: error });
  }
};

// Controller method to get a specific crop by ID
const getFarmFieldsById = async (req, res) => {
  const { id } = req.params;
  try {
    const farmFields = await FarmFields.findById(id);
    if (!farmFields) {
      return res.status(404).json({ error: "FarmFields not found" });
    }
    res.json(farmFields);
  } catch (error) {
    console.error("Error getting farmFields by ID:", error);
    res.status(500).json({ error: "Failed to get farmFields" });
  }
};

const getFarmFieldsByFarmerFields = async (req, res) => {
  try {
    const farmerFields = req.params.farmerFields;
    const farmField = await FarmFields.find({ farmerFields: farmerFields });
    if (!farmField) {
      return res.status(404).json({ error: "Farm field not found" });
    }

    res.json(farmField);
  } catch (error) {
    console.error("Error fetching farm field:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller method to get a farm field by name
const getFarmFieldByName = async (req, res) => {
  try {
    // Extract the farm field name from the request parameters
    const { farmName } = req.params;

    // Query the database to find the farm field by name
    const farmField = await FarmFields.findOne({ farmName });

    // Check if the farm field was found
    if (!farmField) {
      // If the farm field was not found, return a 404 error response
      return res.status(404).json({ error: "Farm field not found" });
    }

    // If the farm field was found, return it in the response
    res.json(farmField);
  } catch (error) {
    // If an error occurs, log the error and return a 500 error response
    console.error("Error getting farm field:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller method to update a farmFields by ID
const updateFarmFieldsById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFarmFields = await FarmFields.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedFarmFields) {
      return res.status(404).json({ error: "FarmFields not found" });
    }
    res.json(updatedFarmFields);
  } catch (error) {
    console.error("Error updating farmFields by ID:", error);
    res.status(500).json({ error: "Failed to update farmFields" });
  }
};

// Controller method to delete a farmFields by ID
const deleteFarmFieldsById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFarmFields = await FarmFields.findByIdAndDelete(id);
    if (!deletedFarmFields) {
      return res.status(404).json({ error: "farmFields not found" });
    }
    res.json({ message: "farmFields deleted successfully" });
  } catch (error) {
    console.error("Error deleting farmFields by ID:", error);
    res.status(500).json({ error: "Failed to delete farmFields" });
  }
};

export default {
  create,
  getAllFarmFields,
  getFarmFieldsById,
  updateFarmFieldsById,
  deleteFarmFieldsById,
  getFarmFieldsByFarmerFields,
};
