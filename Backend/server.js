import express from 'express';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import cors from 'cors';
import signup from './routes/auth/signup.js'
import cookieParser from 'cookie-parser';
import signin from './routes/auth/signin.js'
import { protect } from './middlewares/authMiddleware.js';
import noteRoutes from './routes/auth/noteRoutes.js'
import labelRoute from './routes/auth/labelRoute.js'
import {
  notFoundHandler,
  errorHandler,
} from "./middlewares/errorMiddleware.js";
import logout from "./routes/auth/logout.js";
import { startCronJobs } from "./utils/cronJobs.js";
import profile from "./routes/auth/profile.js";

const app= express();
app.use(cors({
  origin: env.CLIENT_URL, // or your frontend port
  credentials: true, // if using cookies/session
}));
app.use(cookieParser());
app.use(express.json());

await connectDB(); 

startCronJobs();

app.use('/api/users', signup);
app.use('/api/users', signin);

app.use(protect);

app.use('/api/users', logout);
app.use("/api/users", profile);

app.use('/api', noteRoutes);
app.use('/api/labels', labelRoute);

app.use(notFoundHandler);
app.use(errorHandler);

const Port = env.PORT;
app.listen(Port, ()=>(
    console.log(`The server is listining on the port: ${Port}`)
));
