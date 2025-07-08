import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import signup from './routes/auth/signup.js'

dotenv.config();

const app = express();
app.use(express.json());
await connectDB();        // make sure the call happens before app.listen(...)
app.use('/api/users', signup);

const Port = process.env.Port || 5000;
app.listen(Port, ()=>(
    console.log(`The server is listining on the port: ${Port}`)
));