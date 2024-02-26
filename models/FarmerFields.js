import mongoose from 'mongoose';

// Define FarmerFields schema with one-to-one relationship with FarmFields
const FarmerFieldsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    ghCard: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    chainId: {
        type: String,
        required: true
    },
    cooperativeName: {
        type: String,
        enum: ['AGRIC COOP-GHANA', 'Ghana Cooperatives Council (GCC)', 'Chamber of Agribusiness, Ghana', 'Other']
    }
});

const FarmerFields = mongoose.model('FarmerFieldsSchema', FarmerFieldsSchema);

export default FarmerFields;
