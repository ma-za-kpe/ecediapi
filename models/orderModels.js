import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    qualityRequirements: {
        type: String,
        required: true,
    },
    deliveryLocation: {
        type: String,
        required: true,
    },
    deliveryTimeframe: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymentTerms: {
        type: String,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
    packagingPreferences: {
        type: String,
    },
    certifications: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    minCreditScore: {
        type: Number,
    },
    additionalRequirements: {
        type: String,
    },
});

export default mongoose.model('Order', orderSchema);

