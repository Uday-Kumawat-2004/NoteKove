
import Note from "../models/note.js";


async function createNote (req, res)  {
  try {
    const {
      title,
      content,
      checklist,
      color,
      labels,
      collaborators,
      pinned,
      archived,
      trashed,
      position,
      reminders,
    } = req.body;
    const userId = req.user?._id || req.body.user;

    if (!userId) return res.status(401).json({ error: "User not authorised" });

    const newNote = await Note.create({
      user: userId,
      title,
      content,
      checklist,
      color,
      labels,
      collaborators,
      pinned,
      archived,
      trashed,
      position,
      reminders,
    });

    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error("Note creation error:", error.message);
    res.status(500).json({ error: "Failed to create note" });
  }
}

export default createNote;