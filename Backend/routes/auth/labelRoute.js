import express from 'express'
import { createLabel, getLabel } from "../../controllers/labelController.js";
import { protect } from '../../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/",protect ,createLabel)
router.get('/', protect, getLabel);

export default router;