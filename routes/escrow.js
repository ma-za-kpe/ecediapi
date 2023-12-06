import express from 'express';
import escrowController from '../controllers/EscrowController.js';
const router = express.Router();

// Create KYC information
router.post('/v1/kyc', async (req, res) => {
  try {
    const kycInfo = req.body;
    const createdKycInfo = await escrowController.createKycInfo(kycInfo);
    res.status(201).json(createdKycInfo);
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List KYC information
router.get('/v1/kyc', async (req, res) => {
  try {
    const kycInfo = await escrowController.getKycInfo();
    res.status(200).json(kycInfo);
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get KYC details based on KYC level
router.get('/v1/kyc/:level', async (req, res) => {
  const { level } = req.params;
  try {
    const kycDetails = await escrowController.getKycDetailsByLevel(level);
    res.status(200).json(kycDetails);
  } catch (error) {
    console.error('Error kyc: ', error.message);
    res.status(500).json({ error: 'Failed to get KYC information' });
  }
});

// Define the route for updating KYC details based on KYC level
router.put('/v1/kyc/:kycLevel', async (req, res) => {
  const kycLevel = req.params.kycLevel;
  const updatedKycInfo = req.body; // Assuming the updated KYC info is provided in the request body

  try {
    const updatedKycDetails = await escrowController.updateKycDetailsByLevel(kycLevel, updatedKycInfo);
    res.status(200).json(updatedKycDetails);
  } catch (error) {
    if (error.message === 'Unauthorized') {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      res.status(error.response.status || 500).json({ error: error.message });
    }
  }
});

// create an end user wallet
router.post('/v1/create-wallet', async (req, res) => {
  try {
    const walletData = req.body; 
    const createdWallet = await escrowController.createEndUserWallet(walletData);
    res.status(201).json(createdWallet);
  } catch (error) {
    // Handle errors appropriately
    console.error('Error creating end-user wallet:', error);
    res.status(500).json({ error: 'Internal Server Error ' + error });
  }
});

router.get('/v1/tokens', async (req, res) => {
  try {
    const listParam = req.query.list;
    const tokensList = await escrowController.getTokensList(listParam);
    res.status(200).json(tokensList);
  } catch (error) {
    // Handle errors appropriately
    console.error('Error getting tokens list: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to check if a wallet exists
router.get('/v1/check-wallet/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const exists = await escrowController.walletExists(userId);
    res.json({ exists });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateTransactionId() {
    return Math.random().toString(36).substr(2, 9);
  }

// Buyer in Dubai initiates an escrow transaction with a seller of cocoa in Ghana
router.post('/v1/initiate-escrow', async (req, res) => {
    const buyerId = generateTransactionId();
    const sellerId = generateTransactionId();
    const amount = "20"; // The amount of the transaction
  
    try {
      // Check if wallets exist for buyer and seller, create if not
      if (!await escrowController.walletExists(buyerId)) {
        // Country code and institution name are placeholders; replace them with actual values
        await escrowController.createWallet(buyerId, 'AE', 'Buyer Institution', 'buyerTokenId');
      }
  
      if (!await escrowController.walletExists(sellerId)) {
        // Country code and institution name are placeholders; replace them with actual values
        await escrowController.createWallet(sellerId, 'GH', 'Seller Institution', 'sellerTokenId');
      }
  
      // Proceed with escrow initiation logic
      const escrowTransaction = await escrowController.createEscrowTransaction(sellerId, buyerId, amount);
  
      res.status(201).json(escrowTransaction);
      return; // Add this return statement
    } catch (error) {
      console.error(error); // Log the error
      res.status(400).json({ error: error.message });
    }
  });
  
export default router;
