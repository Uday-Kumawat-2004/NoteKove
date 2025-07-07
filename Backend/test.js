import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import User from "./models/user.js";
import { connectDB } from "./config/db.js";

dotenv.config();
async function testSchema() {
  try {
    await connectDB();
    
    const user = new User({
      name: "Udayk",
      email: "udayak@example.com", // ✅ valid email
      password: "Uday@2024", // ✅ strong password
    });

    const savedUser = await user.save();
    console.log("✅ User saved:", savedUser);

  } catch (err) {
    console.error(`error ${err.message}`);
    if (err.errors) {
      for (const key in err.errors) {
        console.error(`Field: ${key} -> ${err.errors[key].message}`);
      }
    }
  } finally {
    mongoose.connection.close();
  }
}
testSchema();
