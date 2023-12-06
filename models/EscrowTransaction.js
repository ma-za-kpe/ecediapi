import mongoose from 'mongoose';

const escrowTransactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  sellerId: { type: String, required: true },
  buyerId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'initiated' },
  transferDetails: {
    // Define the structure based on the data returned by fundEscrowWallet
    // For example, it could include fields like transferId, success, timestamp, etc.
    type: Object,
    required: false
  },
});

export default mongoose.model('EscrowTransaction', escrowTransactionSchema);
