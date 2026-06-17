import { body } from "express-validator";

export const labelValidation = [
  body("labelName")
    .trim()
    .notEmpty()
    .withMessage("Label name is required")
    .isLength({ max: 50 })
    .withMessage("Label name too long"),
];