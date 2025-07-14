import express from 'express'
import createNote from '../../controllers/noteController.js'
import { protect } from '../../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/",protect ,createNote)

export default router;