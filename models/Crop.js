import mongoose from 'mongoose';

// Sub-schema for categories
const categorySchema = new mongoose.Schema({
  fcat: {
    type: Number,
    required: true,
    max: 13
  },
  chance: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    default: '', // Default value can be customized
  },
  heavy: {
    type: String,
    default: '', // Default value can be customized
  },
  advise: {
    type: String,
    required: true,
  },
});

// Main schema for crops
const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories: {
    type: [categorySchema],
    required: true,
  },
});

// Model for crops
const CropModel = mongoose.model('Crop', cropSchema);

export default CropModel;