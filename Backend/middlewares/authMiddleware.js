import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    );

    req.user = decoded;
    next();
  } catch (err) {
    const error = new Error(
      "Invalid or expired token"
    );

    error.statusCode = 401;

    next(error);
  }
};