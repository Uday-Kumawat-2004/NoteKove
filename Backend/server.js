import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';
await connectDB();        // make sure the call happens before app.listen(...)


const Port = process.env.Port || 5000;
app.listen(Port, ()=>(
    console.log(`The server is listining on the port: ${Port}`)
));