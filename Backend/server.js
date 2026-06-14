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
import cron from "node-cron";
import note from './models/note.js';
const app= express();
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend port
  credentials: true, // if using cookies/session
}));
app.use(cookieParser());
app.use(express.json());
await connectDB(); 


cron.schedule("*/2 * * * *", async () => {  // runs every 2 minutes
  try {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // 1 minute ago

    const result = await note.deleteMany({
      trashed: true,
      trashedAt: { $lte: oneMinuteAgo },
    });

    console.log("🗑️ Auto-deleted trashed notes:", result.deletedCount);
  } catch (err) {
    console.error("[CRON JOB ERROR]", err);
  }
});




app.use('/api/users', signup);
app.use('/api/users', signin);
app.use(protect);
app.use('/api', noteRoutes);
app.use('/api/labels', labelRoute);

const Port = env.PORT;
app.listen(Port, ()=>(
    console.log(`The server is listining on the port: ${Port}`)
));
