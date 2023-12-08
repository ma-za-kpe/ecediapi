import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  farmerId: { type: String, required: true},
  orderId: { type: String, required: true },
});

export default mongoose.model('bid', bidSchema);
