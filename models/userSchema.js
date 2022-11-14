import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
    },
    userType: {
        type: String,
        require: true,
    },
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        default: '',
    },
    contactNumber: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    state: {
        type: String,
        default: '',
    },
    postcode: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    randomToken: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});

export default mongoose.model('User', userSchema);