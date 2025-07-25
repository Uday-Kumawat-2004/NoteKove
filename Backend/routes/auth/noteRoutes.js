import express from 'express'
import{ createNote, getUserNotes, deleteNote, updateNote } from '../../controllers/noteController.js'
import { protect } from '../../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/notes" ,createNote);
router.get("/notes", getUserNotes);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;