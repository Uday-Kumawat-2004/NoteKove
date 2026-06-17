import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "MONGO_URI",
  "JWT_SECRET",
];

const missingEnvVars =
  requiredEnvVars.filter((name) => {
    const value = process.env[name]?.trim();
    return !value;
  });

if (missingEnvVars.length > 0) {
  throw new Error(
    `Environment validation failed: missing required variable${
      missingEnvVars.length > 1 ? "s" : ""
    }: ${missingEnvVars.join(", ")}`
  );
}

const jwtSecret =
  process.env.JWT_SECRET.trim();

if (jwtSecret.length < 32) {
  throw new Error(
    "Environment validation failed: JWT_SECRET must be at least 32 characters long."
  );
}

export const env = {
  MONGO_URI:
    process.env.MONGO_URI.trim(),

  JWT_SECRET: jwtSecret,

  PORT: Number(
    process.env.PORT || 4000
  ),

  NODE_ENV:
    process.env.NODE_ENV ||
    "development",

  CLIENT_URL:
    process.env.CLIENT_URL ||
    "http://localhost:5173",
};