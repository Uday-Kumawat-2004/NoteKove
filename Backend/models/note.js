import mongoose from "mongoose";
import { escapeRegex } from "../utils/escapeRegex.js";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
      maxLength: 250,
    },
    content: {
      raw: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
      },
      plainText: {
        type: String,
        default: "",
        trim: true,
        index: "text",
      },
      length: {
        type: Number,
        default: 0,
      },
    },
    checklist: [
      {
        id: {
          type: String,
          default: () => new mongoose.Types.ObjectId().toString(),
        },
        text: {
          type: String,
          trim: true,
        },
        done: {
          type: Boolean,
          default: false,
        },
        position: {
          type: Number,
          default: 0,
        },
      },
    ],
    noteType: {
      type: String,
      enum: ["text", "checklist"],
      default: "text",
      index: true,
    },
    color: {
      type: String,
      default: "transparent",
    },
    labels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Label",
      },
    ],

    pinned: {
      type: Boolean,
      default: false,
      index: true,
    },
    archived: {
      type: Boolean,
      default: false,
      index: true,
    },
    trashed: {
      type: Boolean,
      default: false,
      index: true,
    },
  trashedAt: {
    type: Date,
    default: null,
    index: true,   // ← add this so the cron query is fast at scale
  },
    position: {
      type: Number,
      default: 0,
    },
    reminders: [
  {
    date: {
      type: Date,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
],
  },
  { timestamps: true }
);

noteSchema.statics.findByUser = function (
  userId,
  options = {},
  pagination = {}
) {

  const {
    page = 1,
    limit = 20
  } = pagination;


  const query = {
    user: userId,
    trashed: false,
    archived: false,
    ...options,
  };


  return this.find(query)
    .populate("labels")
    .sort({
      pinned: -1,
      updatedAt: -1,
    })
    .skip(
      (page - 1) * limit
    )
    .limit(limit);
};

noteSchema.statics.findArchivedByUser = function (userId) {
  return this.find({
    user: userId,
    archived: true,
    trashed: false,
  }).sort({ updatedAt: -1 });
};

noteSchema.statics.findTrashedByUser = function (userId) {
  return this.find({
    user: userId,
    trashed: true,
  }).sort({ updatedAt: -1 });
};

noteSchema.statics.searchNotes = function (
  userId,
  searchTerm
) {
  const escapedSearch =
    escapeRegex(searchTerm);

  return this.find({
    user: userId,
    trashed: false,
    $or: [
      {
        title: {
          $regex: escapedSearch,
          $options: "i",
        },
      },
      {
        "content.plainText": {
          $regex: escapedSearch,
          $options: "i",
        },
      },
    ],
  })
    .limit(50)
    .sort({ updatedAt: -1 });
};

noteSchema.statics.findByLabel = function (userId, label) {
  return this.find({
    user: userId,
    trashed: false,
    labels: label,
  }).sort({ pinned: -1, updatedAt: -1 });
};

noteSchema.statics.findWithUpcomingReminders = function (userId) {
  return this.find({
    user: userId,
    trashed: false,
    "reminders.date": { $gte: new Date() },
    "reminders.completed": false,
  }).sort({ "reminders.date": 1 });
};

noteSchema.statics.findReminderNotes =
function(userId){

  return this.find({

    user:userId,

    trashed:false,

    "reminders.completed":false,

    "reminders.date":{
      $gte:new Date()
    }

  })
  .populate("labels")
  .sort({
    "reminders.date":1
  });

};

export default mongoose.model("Note", noteSchema);
