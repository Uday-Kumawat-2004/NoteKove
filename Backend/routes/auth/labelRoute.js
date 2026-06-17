import express from "express";

import {
  createLabel,
  getLabel,
  updateLabel,
  deleteLabel,
} from "../../controllers/labelController.js";

import { labelValidation } from "../../validators/labelValidator.js";

import { validate } from "../../middlewares/validate.js";

const router = express.Router();

router.post(
  "/",
  labelValidation,
  validate,
  createLabel
);

router.get("/", getLabel);

router.put(
  "/:id",
  labelValidation,
  validate,
  updateLabel
);

router.delete("/:id", deleteLabel);

export default router;