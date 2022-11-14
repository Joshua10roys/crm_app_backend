import mongoose from "mongoose";

// to create connection
async function connect() {
    await mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log('connected to MongoDB') })
        .catch(err => { throw (err.message) })
}

// to confirm connection and server running
export default async function startServer() {
    await connect()
    console.log(`server is listening on port ${process.env.PORT}`);
}