import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
    checklist: [
      {
        text: { type: String, trim: true },
        done: { type: Boolean, default: false },
      },
    ],
    color: {
      type: String,
      default: "#ffffff",
    },
    labels: [
      {
        type: String,
        trim: true,
      },
    ],
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pinned: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    trashed: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      default: 0,
    },
    reminders: [
      {
        type: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Note", noteSchema);
