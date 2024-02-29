import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define FarmFields schema
const FarmFieldsSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
  },
  farmLocation: {
    type: [
      {
        type: {
          type: String,
          enum: ["Point"], // Only support Point for now
          required: true,
        },
        coordinates: {
          type: [Number], // [<longitude>, <latitude>]
          required: true,
        },
      },
    ],
    required: true,
  },
  ownershipType: {
    type: String,
    enum: [
      "individual",
      "family-owned",
      "cooperative-owned",
      "leased",
      "rented",
    ],
    required: true,
  },
  ndvi_chart: {
    type: String,
    required: false,
  },
  cropTree: {
    type: String,
    required: true,
  },
  irrigationSystem: {
    type: String,
    enum: [
      "drip irrigation",
      "sprinkler irrigation",
      "flood irrigation",
      "rain-fed",
    ],
    required: true,
  },
  insurer: {
    type: String,
    enum: [
      "Ghana Agricultural Insurance Pool (GAIP)",
      "SIC Insurance Company",
      "Ghana National Insurance Company",
      "Star Assurance",
    ],
  },
  farmerFields: {
    type: String,
    required: true,
  },
  assetId: {
    type: String,
    required: false,
  },
});

const FarmFields = mongoose.model("FarmFieldsSchema", FarmFieldsSchema);

export default FarmFields;
