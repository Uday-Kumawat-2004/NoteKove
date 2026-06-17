import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        code: 400,
        details: errors.array().map(e => ({ field: e.path, message: e.msg })),
      },
    });
  }

  next();
};