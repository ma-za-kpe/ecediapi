import mongoose from 'mongoose';

// Income Schema
const incomeSchema = new mongoose.Schema({
    orderId: {
      type: String
    },
  });

  export default mongoose.model('Income', incomeSchema);
