import Note from "../models/note.js";

export async function createNote(req, res) {
  try {
    const {
      title,
      content,
      checklist,
      noteType,
      color,
      labels,
      pinned,
      archived,
      trashed,
      position,
      reminders,
    } = req.body;
    const userId = req.user._id;

    if (!userId) return res.status(401).json({ error: "User not authorized" });

    const newNote = await Note.create({
      user: userId,
      title,
      content,
      checklist,
      noteType,
      color,
      labels,
      pinned,
      archived,
      trashed: false,
      trashedAt: null,
      position,
      reminders,
    });

    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error("Note creation error:", error.message);
    res.status(500).json({ error: "Failed to create note" });
  }
}

export async function getUserNotes(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ error: "User not authorized" });

    const { trashed, archived } = req.query;

    let notes;
    if (trashed === "true") {
      notes = await Note.findTrashedByUser(userId);
    } else if (archived === "true") {
      notes = await Note.findArchivedByUser(userId);
    } else {
      notes = await Note.findByUser(userId);
    }

    res.status(200).json({ success: true, notes });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch notes", details: err.message });
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ error: "User not authorized" });

    const allowedFields = [
      "title",
      "content",
      "checklist",
      "noteType",
      "color",
      "labels",
      "pinned",
      "archived",
      "position",
      "reminders",
    ];

    const updateData = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No valid note fields provided" });
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Note updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed updated successfully",
      details: err.message,
    });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const note = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { trashed: true, trashedAt: new Date() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ success: true, message: "Note moved to trash" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete note", details: error.message });
  }
}

export async function restoreNote(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const note = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { trashed: false, trashedAt: null },
      { new: true }
    );

    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json({ success: true, message: "Note restored", note });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to restore note", details: err.message });
  }
}

export async function searchNotes(req, res){
  try{
    const { q } = req.query;
    const userId = req.user._id;

    if( !q || q.trim() === ""){
      return res.json([]);
    }

    const notes = await Note.searchNotes(userId, q);
    res.json(notes);
  }
  catch(err){
    res.status(500).json({error: "Search failed"});
  }
}
