import mongoose from "mongoose";


const bidSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    bidAmount: {
        type: Number,
        required: true,
    },
    bidDate: {
        type: Date,
        required: true,
    },
    bidStatus: {
        type: String,
        required: true,
    },
    bidWinner: {
        type: Boolean,
        required: true,
    },
    bidWinnerDate: {
        type: Date,
        required: true,
    },
    bidWinnerAmount: {
        type: Number,
        required: true,
    },
    bidWinnerStatus: {
        type: String,
        required: true,
    },
    bidWinnerPaid: {
        type: Boolean,
        required: true,
    },
    bidWinnerPaidDate: {
        type: Date,
        required: true,
    },
    bidWinnerPaidAmount: {
        type: Number,
        required: true,
    },
    bidWinnerPaidStatus: {
        type: String,
        required: true,
    },
    bidWinnerPaidProof: {
        type: String,
        required: true,
    },
    bidWinnerPaidProofDate: {
        type: Date,
        required: true,
    },
    bidWinnerPaidProofStatus: {
        type: String,
        required: true,
    },
    bidWinnerPaidProofApproved: {
        type: Boolean,
        required: true,
    },
    bidWinnerPaidProofApprovedDate: {
        type: Date,
        required: true,
    },
    bidWinnerPaidProofApprovedStatus: {
        type: String,
        required: true,
    },
    bidWinnerPaidProofApprovedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bidWinnerPaidProofApprovedProof: {
        type: String,
        required: true,
    },
    bidWinnerPaidProofApprovedProofDate: {
        type: Date,
        required: true,
    },
    bidWinnerPaidProofApprovedProofStatus: {
        type: String,
        required: true,
    },
    bidWinnerPaidProofApprovedProofApproved: {
        type: Boolean,
        required: true,
    },
});

export default mongoose.model('Bid', bidSchema);