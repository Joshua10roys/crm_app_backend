import mongoose from "mongoose";


const serviceSchema = new mongoose.Schema({

    serviceTitle: {
        type: String,
        require: true
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
    type: {
        type: String,
        require: true
    },
    priority: {
        type: String,
        require: true
    },
    dueDate: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    emailId: {
        type: String,
    },
    contactNumber: {
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
})

export default mongoose.model('Service', serviceSchema);