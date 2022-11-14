import mongoose from "mongoose";


const leadSchema = new mongoose.Schema({

    leadTitle: {
        type: String,
        require: true,
    },
    assignedUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    contact: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Contact',
        required: true,
    },
    companyName: {
        type: String,
        require: true,
    },
    leadCloseDate: {
        type: String,
        require: true,
    },
    probability: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    emailId: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    website: {
        type: String,
    },
    source: {
        type: String,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});

export default mongoose.model('Lead', leadSchema);