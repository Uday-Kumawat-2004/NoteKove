import express from 'express'
import{ createNote, getUserNotes, deleteNote, updateNote, restoreNote, searchNotes } from '../../controllers/noteController.js'
import { protect } from '../../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/notes" ,createNote);
router.get("/notes", getUserNotes);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.put("/notes/restore/:id", restoreNote);
router.get("/notes/search", searchNotes);
export default router;