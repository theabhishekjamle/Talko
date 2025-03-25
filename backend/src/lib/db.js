import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const mongourl = "mongodb+srv://test-1:MEobwOeAUlNGw7zD@cluster0.00teq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongourl);
        console.log('Database connected');
    } catch (error) {
        console.error('Connection failed:', error.message);
    }
};



