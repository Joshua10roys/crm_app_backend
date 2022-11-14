import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({

    firstname: {
        type: String,
        require: true,
        maxLength: 20,
    },
    lastname: {
        type: String,
        maxLength: 20,
    },
    company: {
        type: String,
        default: '',
    },
    position: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: '',
    },
    line1: {
        type: String,
        default: '',
    },
    street: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    postcode: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});

export default mongoose.model('Contact', contactSchema);