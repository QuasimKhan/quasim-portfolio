import mongoose from "mongoose";
import { env } from "../config/env.js";
const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);

        console.log("MongoDB connected")
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;