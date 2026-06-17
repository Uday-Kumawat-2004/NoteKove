import express from "express";
import { signup } from "../../controllers/authController.js";
import { signupValidation } from "../../validators/authValidator.js";
import { validate } from "../../middlewares/validate.js";

const router = express.Router();

router.post(
  "/signup",
  signupValidation,
  validate,
  signup
);

export default router;