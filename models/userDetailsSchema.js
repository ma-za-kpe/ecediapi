import mongoose from 'mongoose';

// UserDetails Schema
const userDetailsSchema = new mongoose.Schema({
  landsize: {
    type: Number,
  },
  creditScore: {
    type: Number,
  },
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Income',
    },
  ],
  debts: [
    {
      amount: {
        type: Number,
        required: false,
      },
      bank: {
        type: String,
        required: false,
      },
    },
  ],
  });

  export default mongoose.model('UserDetails', userDetailsSchema);
