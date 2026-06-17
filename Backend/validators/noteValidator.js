import { body, query } from "express-validator";

export const createNoteValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 250 })
    .withMessage("Title too long"),

  body("noteType")
    .optional()
    .isIn(["text", "checklist"])
    .withMessage("Invalid note type"),

  body("color")
    .optional()
    .isString()
    .withMessage("Color must be a string"),

  body("pinned")
    .optional()
    .isBoolean()
    .withMessage("Pinned must be boolean"),

  body("archived")
    .optional()
    .isBoolean()
    .withMessage("Archived must be boolean"),
];

export const updateNoteValidation =
  createNoteValidation;

export const searchNoteValidation = [
  query("q")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search query must be 100 characters or less"),
];