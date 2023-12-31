import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const collectiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: false,
  }],
  apiToken: {
    type: String,
    required: true,
  },
});

const CollectiveModel = mongoose.model('Collective', collectiveSchema);

export default CollectiveModel;