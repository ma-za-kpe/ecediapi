import mongoose from 'mongoose';

const insuranceCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  services: [{
    type: String,
    enum: ['Livestock Insurance', 'Agricultural Insurance', 'Crop Insurance', 'Other'],
  }],
  packages: [{
    name: {
      type: String,
      required: true,
    },
    coverage: {
      type: String,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
  }],
  coverageArea: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5,
  },
  website: {
    type: String,
    validate: {
      validator: (value) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
      },
      message: 'Invalid URL format',
    },
  },
});

const InsuranceModel = mongoose.model('Insurance', insuranceCompanySchema);

export default InsuranceModel;
