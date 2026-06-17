import express from "express";
import { signin } from "../../controllers/authController.js";
import { signinValidation } from "../../validators/authValidator.js";
import { validate } from "../../middlewares/validate.js";

const router = express.Router();
router.post(
  "/signin",
  signinValidation,
  validate,
  signin
);
export default router;