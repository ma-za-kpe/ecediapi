import express from 'express';
import insuranceCompanyController from '../controllers/InsuranceCompanyController.js';

const router = express.Router();

// Create a new insurance company
router.post('/', insuranceCompanyController.createInsuranceCompany);

// Get all insurance companies
router.get('/', insuranceCompanyController.getAllInsuranceCompanies);

// Get insurance company by ID
router.get('/:id', insuranceCompanyController.getInsuranceCompanyById);

// Update insurance company by ID
router.put('/:id', insuranceCompanyController.updateInsuranceCompanyById);

// Delete insurance company by ID
router.delete('/:id', insuranceCompanyController.deleteInsuranceCompanyById);

export default router;