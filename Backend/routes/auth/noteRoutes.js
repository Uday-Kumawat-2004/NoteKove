import express from "express";
import {
createNote,
getUserNotes,
deleteNote,
permanentDeleteNote,
updateNote,
restoreNote,
searchNotes,
getReminderNotes
} from "../../controllers/noteController.js";
import {
  createNoteValidation, updateNoteValidation, searchNoteValidation,
} from "../../validators/noteValidator.js";
import { validate } from "../../middlewares/validate.js";

const router = express.Router();

// specific routes first
router.get("/notes/search", searchNoteValidation, validate, searchNotes);
router.put("/notes/restore/:id", restoreNote);
router.delete("/notes/:id/permanent", permanentDeleteNote);

// param routes after
router.post("/notes", createNoteValidation, validate, createNote);
router.get("/notes", getUserNotes);
router.get("/notes/reminders",getReminderNotes);
router.put("/notes/:id", updateNoteValidation, validate, updateNote);
router.delete("/notes/:id", deleteNote);

export default router;