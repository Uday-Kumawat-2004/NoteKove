import express from 'express';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import signup from './routes/auth/signup.js'
import cookieParser from 'cookie-parser';
import signin from './routes/auth/signin.js'
import { protect } from './middlewares/authMiddleware.js';
import noteRoutes from './routes/auth/noteRoutes.js'
import labelRoute from './routes/auth/labelRoute.js'
dotenv.config();
const app= express();
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend port
  credentials: true, // if using cookies/session
}));
app.use(cookieParser());
app.use(express.json());
await connectDB(); 


app.use('/api/users', signup);
app.use('/api/users', signin);
app.use(protect);
app.use('/api', noteRoutes);
app.use('/api/labels', labelRoute);

const Port = process.env.Port || 5000;
app.listen(Port, ()=>(
    console.log(`The server is listining on the port: ${Port}`)
));