import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { env } from "../config/env.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
  success: true,
  data: {
    message: "User registered successfully",
  },
  });
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,

    secure:
      env.NODE_ENV === "production",

    sameSite:
      env.NODE_ENV === "production"
        ? "None"
        : "Lax",

    maxAge:
      7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
  success: true,
  data: {
    message: "Logged in successfully",
  },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
  success: true,
  data: {
    message: "Logged out successfully",
  },
  });
});