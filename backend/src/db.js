import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Ensure dotenv is loaded

const MONGO_URI = "mongodb+srv://test-1:MEobwOeAUlNGw7zD@cluster0.00teq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoose =require('mongoose');
async function ConnectMongo(){
    try {
        await mongoose.connect("mongodb+srv://test-1:MEobwOeAUlNGw7zD@cluster0.00teq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('connected to mongodb');
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}
module.exports = ConnectMongo