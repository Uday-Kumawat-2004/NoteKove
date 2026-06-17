// utils/cronJobs.js
import cron from "node-cron";
import Note from "../models/note.js";

const TRASH_RETENTION_DAYS = 30;

export const startCronJobs = () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      const cutoff = new Date(
        Date.now() - TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000
      );

      // Guard: only delete notes where trashedAt is actually set
      const result = await Note.deleteMany({
        trashed: true,
        trashedAt: { $ne: null, $lte: cutoff },
      });

      console.log(
        `[CRON] Auto-deleted ${result.deletedCount} trashed note(s) older than ${TRASH_RETENTION_DAYS} days`
      );
    } catch (err) {
      console.error("[CRON] Failed to auto-delete trashed notes:", err.message);
    }
  });

  console.log("[CRON] Trash cleanup job scheduled — runs daily at 3:00am");
};