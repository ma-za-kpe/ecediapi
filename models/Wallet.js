
import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  tokenId: { type: String, required: true },
  kycLevel: { type: String, default: 'standard' },
  countryCode: { type: String, required: true },
  institutionName: { type: String, required: true },
});

export default mongoose.model('Wallet', walletSchema);
