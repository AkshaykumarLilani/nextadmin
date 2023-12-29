import mongoose from "mongoose";

const connection = {}

export const connectDb = async () => {
    try {
        if (connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO_URL);
        connection.isConnected = db.connections[0].readyState;
    } catch (err) {
        console.log(err);
        throw new Error("DB Connection Failed");
    }
}