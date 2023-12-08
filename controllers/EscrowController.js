import axios from 'axios';
import Wallet from '../models/Wallet.js';
import EscrowTransaction from '../models/EscrowTransaction.js';

const externalApiUrl = 'https://digitalassets.hack.bog.emtech.com/dcpexternal';
// https://digitalassets.hack.bog.emtech.com/dcpexternal/v1/wallets/{walletId}

let accessToken = null; // Store the access token
let isTokenObtained = false; // New flag to track if the token has been obtained

async function getAccessToken(clientId, clientSecret) {
  try {
    const response = await axios.post(`${externalApiUrl}/v1/auth/token`, {
      clientId,
      clientSecret,
    });

    if (response.status === 200) {
      accessToken = response.data.accessToken;
      // isTokenObtained = true; // Set the flag to true after obtaining the token
      console.log("accessToken ... ", accessToken)
      return accessToken;
    } else {
      return {
        error: 'Failed to obtain access token',
        message: error.message,
      };
    }
  } catch (error) {
    console.error('Error obtaining access token:', error.message);
    return {
      error: 'Failed to obtain access token',
      message: error.message,
    };
  }
}

// Call this function before making authenticated requests
async function ensureAccessToken() {
  if (!accessToken) {
    await getAccessToken(process.env.CLIENT_ID, process.env.CLIENT_KEY);
  }
  // if (!accessToken && !isTokenObtained) {
  //   await getAccessToken(process.env.CLIENT_ID, process.env.CLIENT_KEY);
  // }
}

// Controller method to create KYC information
async function createKycInfo(kycInfo) {
  await ensureAccessToken();
  try {
    const response = await axios.post(`${externalApiUrl}/v1/kyc`, kycInfo,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating KYC information:', error.response.status, "message ", error.response.data);
    return {
      error: 'Failed to create KYC information',
      status: error.response.status,
      message: error.response.data,
    };
  }
}

// Controller method to list available KYC information
async function getKycInfo() {
  await ensureAccessToken();
  try {
    const response = await axios.get(`${externalApiUrl}/v1/kyc`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;

  } catch (error) {
    console.error('Error getting KYC information:', error.response.status, "message ", error.response.data);
    return {
      error: 'Failed to get KYC information',
      status: error.response.status,
      message: error.response.data,
    };
  }
}

// Controller method to get KYC details based on KYC level
async function getKycDetailsByLevel(kycLevel) {
  await ensureAccessToken();
  try {
    const response = await axios.get(`${externalApiUrl}/v1/kyc/${kycLevel}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting KYC information details:', error.response.status, "message ", error.response.data);
    return {
      error: 'Failed to get KYC information details',
      status: error.response.status,
      message: error.response.data,
    };
  }
}

// Controller method to update KYC details based on KYC level
async function updateKycDetailsByLevel(kycLevel, updatedKycInfo) {
  await ensureAccessToken();
  try {
    const response = await axios.put(`${externalApiUrl}/v1/kyc/${kycLevel}`, updatedKycInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating KYC information details:', error.response.status, "message ", error.response.data);
    return {
      error: 'Failed to update KYC information details',
      status: error.response.status,
      message: error.response.data,
    };
  }
}

async function createEndUserWallet(walletData) {
  await ensureAccessToken();
  try {
    const response = await axios.post(`${externalApiUrl}/v1/wallets`, 
    walletData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    );
    console.log('success msg: walletExists' , response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating end-user wallet:', error.response.status, "message ", error.response.data);
    return {
      error: 'Failed to create end-user wallet',
      status: error.response.status,
      message: error.response.data,
    };
  }
}

async function listWallets(category) {
    await ensureAccessToken();

    try {
      const response = await axios.get(`${externalApiUrl}/v1/wallets`, {
        params: { category },
      });
      return response.data;
    } catch (error) {
      console.error('Error listing wallets:',  error.response.status, "message ", error.response.data);
      return {
        error: 'Failed to list wallets',
        status: error.response.status,
        message: error.response.data,
      };
    }
  }

  async function getTokensList(list) {
    await ensureAccessToken();
    try {
      const response = await axios.get(`${externalApiUrl}/v1/tokens`,
      {
        params: { category: 'End_User' },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("accessToken ** ", accessToken)

      console.error('Error getting tokens list:',  error.response.status, "message ", error.response.data);
      return {
        error: 'Failed to get tokens list',
        status: error.response.status,
        message: error.response.data,
      };
    }
  }
  

// Parallelize API Requests (Instead of awaiting each API request sequentially, you can fire 
// them off in parallel to reduce the total time spent waiting for external responses.)
// help improve the performance by minimizing the time 
// spent waiting for external API responses and executing operations concurrently when possible
async function parallelRequests(requests) {
    // Use Promise.all for Concurrent Operations: Combine multiple asynchronous operations using 
    // Promise.all to execute them concurrently.
  return Promise.all(requests.map(request => request()));
}

async function walletExists(walletId) {
    await ensureAccessToken();
  
    try {
      const response = await axios.get(`${externalApiUrl}/v1/wallets/${walletId}`, 
      {
        params: { category: 'End_User' },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('success wallet existence: walletExists' , response.data)
      return response.status === 200 && response.data.length > 0;
    } catch (error) {
      console.error('Error checking wallet existence:', "status ", error.response.status, "message ", error.response.data);
      return false;
    }
  }

async function checkUserBalance(walletId) {
    await ensureAccessToken();
    try {
        const response = await axios.get(`${externalApiUrl}/v1/wallets/${walletId}`);
        const walletDetails = response.data;
        console.log('success msg:' , walletDetails)
        return walletDetails.balance;
    } catch (error) {
        console.error('Error checking user balance: checkUserBalance', error.response.status, "message ", error.response.data);
        return {
          error: 'Failed to check user balance',
          status: error.response.status,
          message: error.response.data,
        };
    }
}

async function fundEscrowWallet(amount, tokenId, latitude, longitude, sourceWalletId, destinationWalletId) {
    await ensureAccessToken();

    try {
        const response = await axios.post(`${externalApiUrl}/v1/transfers`, {
            amount,
            tokenId,
            latitude,
            longitude,
            sourceWalletId,
            destinationWalletId,
          });
          console.log('success msg:fundEscrowWallet ' , walletDetails)
          return response.data;
    } catch (error) {
        console.error('Error checking user balance:', "status ", error.response.status, "message ", error.response.data);
        return {
          error: 'Failed to initiate transfer',
          status: error.response.status,
          message: error.response.data,
        };
    }
}

async function updateWalletBalance(walletId, amount) {
  // Update this part based on your actual Wallet model structure
  return Wallet.findOneAndUpdate(
    { userId: walletId },
    { $inc: { balance: amount } },
    { new: true }
  );
}

async function createWallet(userId, countryCode, institutionName, tokenId) {
    await ensureAccessToken();

    try {
        const response = await axios.post(`${externalApiUrl}/v1/wallets`, {
            userId,
            tokenId,
            kycLevel: 'standard',
            countryCode,
            institutionName,
          });
          const wallet = response.data;
          // Save the wallet in the local database
          console.log('success msg: createWallet' , response)
          await Wallet.create(wallet);
          return wallet;
    } catch (error) {
        console.error('Error creating wallet:', "status ", error.response.status, "message ", error.response.data);
        return {
          error: 'Failed to create wallet',
          status: error.response.status,
          message: error.response.data,
        };
    }
}

async function createEscrowTransaction(sellerId, buyerId, amount) {
  try {
    const [sellerExists, buyerExists, sellerBalance, buyerWallet] = await parallelRequests([
      () => walletExists(),
      () => walletExists(),
      () => checkUserBalance(sellerId),
      () => Wallet.findOne({ userId: buyerId }),
    ]);

    if (!sellerExists || !buyerExists) {
      return {
        error: 'Seller or buyer wallet does not exist'
      };
    }

    if (sellerBalance < amount) {
      return {
        error: 'Insufficient funds in buyer wallet'
      };
    }

    // Deduct amount from buyer's wallet, initiate transfer from buyer to escrow wallet
    const transferDetails = await fundEscrowWallet(amount, buyerWallet.tokenId, buyerWallet.latitude, buyerWallet.longitude, buyerId, escrowWalletId);

    buyerWallet.balance -= amount;
    await buyerWallet.save();

    // Simulated escrow initiation logic
    const transactionId = generateTransactionId();
    const escrowTransaction = await EscrowTransaction.create({
      transactionId,
      sellerId,
      buyerId,
      amount,
      status: 'initiated',
      transferDetails,
    });

    // Print transaction details
    console.log(`Escrow Transaction initiated: ${JSON.stringify(escrowTransaction)}`);

    return escrowTransaction;
  } catch (error) {
    console.error('Error creating escrow transaction:', "status ", error.response.status, "message ", error.response.data);
    return {
      error: 'Failed to create escrow transaction',
      status: error.response.status,
      message: error.response.data,
    };
  }
}

function generateTransactionId() {
  return Math.random().toString(36).substr(2, 9);
}

export default {
  walletExists,
  createWallet,
  createEscrowTransaction,
  createEndUserWallet,
  getTokensList,
  createKycInfo,
  getKycInfo,
  getKycDetailsByLevel,
  updateKycDetailsByLevel
};

