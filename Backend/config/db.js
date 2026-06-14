import mongoose from 'mongoose';
import { env } from './env.js';

const mongoUri = env.MONGO_URI;

export  const connectDB = async () => {
    try{
        await mongoose.connect(mongoUri);
        console.log(`MongoDB connected ➜ ${mongoose.connection.host}`);
    }
    catch(err){
        console.error(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
}
