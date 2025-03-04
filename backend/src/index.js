import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { io, app, httpserver } from './lib/socket.js';

dotenv.config();

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 5000;
httpserver.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
});
