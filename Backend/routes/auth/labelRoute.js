import express from "express";
import {
  createLabel,
  getLabel,
  updateLabel,
  deleteLabel,
} from "../../controllers/labelController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/", protect, createLabel);

router.get("/", protect, getLabel);

router.put("/:id", protect, updateLabel);

router.delete("/:id", protect, deleteLabel);

export default router;
