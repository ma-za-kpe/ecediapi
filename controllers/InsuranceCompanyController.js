import InsuranceModel from '../models/InsuranceCompany.js';

// Create a new insurance company
const createInsuranceCompany = async (req, res) => {
  try {
    const newInsuranceCompany = await InsuranceModel.create(req.body);
    res.status(201).json(newInsuranceCompany);
  } catch (error) {
    console.error('Error creating insurance company:', error.message);
    res.status(500).json({ 
        error: 'Failed to create insurance company',
        reason: error.message
    });
  }
};

// Get all insurance companies
const getAllInsuranceCompanies = async (req, res) => {
  try {
    const insuranceCompanies = await InsuranceModel.find();
    res.json(insuranceCompanies);
  } catch (error) {
    console.error('Error getting insurance companies:', error.message);
    res.status(500).json({ error: 'Failed to get insurance companies' });
  }
};

// Get insurance company by ID
const getInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const insuranceCompany = await InsuranceModel.findById(id);
    if (!insuranceCompany) {
      return res.status(404).json({ error: 'Insurance company not found' });
    }
    res.json(insuranceCompany);
  } catch (error) {
    console.error('Error getting insurance company by ID:', error.message);
    res.status(500).json({ error: 'Failed to get insurance company' });
  }
};

// Update insurance company by ID
const updateInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedInsuranceCompany = await InsuranceModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedInsuranceCompany) {
      return res.status(404).json({ error: 'Insurance company not found' });
    }
    res.json(updatedInsuranceCompany);
  } catch (error) {
    console.error('Error updating insurance company by ID:', error.message);
    res.status(500).json({ error: 'Failed to update insurance company' });
  }
};

// Delete insurance company by ID
const deleteInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInsuranceCompany = await InsuranceModel.findByIdAndDelete(id);
    if (!deletedInsuranceCompany) {
      return res.status(404).json({ error: 'Insurance company not found' });
    }
    res.json({ message: 'Insurance company deleted successfully' });
  } catch (error) {
    console.error('Error deleting insurance company by ID:', error.message);
    res.status(500).json({ error: 'Failed to delete insurance company' });
  }
};

export default {
  createInsuranceCompany,
  getAllInsuranceCompanies,
  getInsuranceCompanyById,
  updateInsuranceCompanyById,
  deleteInsuranceCompanyById,
};
