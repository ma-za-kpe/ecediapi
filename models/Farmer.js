import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  crops: [{
    type: String,
    required: true,
  }],
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  collective: {
    type: String,
    required: true,
  },
});

const FarmerModel = mongoose.model('Farmer', farmerSchema);

export default FarmerModel;