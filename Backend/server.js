import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import signup from './routes/auth/signup.js'
import cookieParser from 'cookie-parser';
import signin from './routes/auth/signin.js'
import { protect } from './middlewares/authMiddleware.js';
dotenv.config();
const app= express();
app.use(cookieParser());
app.use(express.json());
await connectDB(); P


app.use('/api/users', signup);
app.use('/api/users', signin);
app.get('/api/protected', protect, (req, res) => {
  res.status(200).json({
    message: `Hello ${req.user.userId}, you're authenticated!`,
  });
});

const Port = process.env.Port || 5000;
app.listen(Port, ()=>(
    console.log(`The server is listining on the port: ${Port}`)
));