import Note from "../models/note.js";
import Label from "../models/labels.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createNote = asyncHandler(async (req, res) => {
const {
title,
content,
checklist,
noteType,
color,
labels,
pinned,
archived,
position,
reminders,
} = req.body;

const userId = req.user._id;

if (!userId) {
const error = new Error("User not authorized");
error.statusCode = 401;
throw error;
}

if (labels?.length) {
const validLabels = await Label.countDocuments({
_id: { $in: labels },
user: userId,
});


if (validLabels !== labels.length) {
  const error = new Error(
    "One or more labels do not belong to the user"
  );
  error.statusCode = 400;
  throw error;
}


}

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

res.status(201).json({
success: true,
data: newNote,
});
});

export const getUserNotes = asyncHandler(
  async (req,res)=>{

    const userId = req.user._id;


    const {
      trashed,
      archived,
      page = 1,
      limit = 20,
    } = req.query;


    let filter = {
      user:userId,
    };


    let notes;


    if(trashed==="true"){

      notes =
      await Note.findTrashedByUser(
        userId
      );

    }

    else if(archived==="true"){

      notes =
      await Note.findArchivedByUser(
        userId
      );

    }

    else{

      notes =
      await Note.findByUser(
        userId,
        {},
        {
          page:Number(page),
          limit:Number(limit),
        }
      );

    }


    const totalNotes =
      await Note.countDocuments({
        user:userId,
        trashed:false,
      });


    res.status(200).json({

      success:true,

      data:{

        notes,

        pagination:{

          page:Number(page),

          limit:Number(limit),

          totalNotes,

          totalPages:
          Math.ceil(
            totalNotes / limit
          ),

          hasNextPage:
          page <
          Math.ceil(
            totalNotes / limit
          ),
        },
      },
    });
  }
);

export const updateNote = asyncHandler(async (req, res) => {
const { id } = req.params;
const userId = req.user._id;

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
Object.entries(req.body).filter(([key]) =>
allowedFields.includes(key)
)
);

if (Object.keys(updateData).length === 0) {
const error = new Error(
"No valid note fields provided"
);
error.statusCode = 400;
throw error;
}

if (updateData.labels?.length) {
const validLabels = await Label.countDocuments({
_id: { $in: updateData.labels },
user: userId,
});


if (
  validLabels !== updateData.labels.length
) {
  const error = new Error(
    "One or more labels do not belong to the user"
  );
  error.statusCode = 400;
  throw error;
}


}

const note = await Note.findOneAndUpdate(
{
_id: id,
user: userId,
},
updateData,
{
new: true,
runValidators: true,
}
);

if (!note) {
const error = new Error("Note not found");
error.statusCode = 404;
throw error;
}

res.status(200).json({
success: true,
data: note,
});
});

export const deleteNote = asyncHandler(async (req, res) => {
const { id } = req.params;
const userId = req.user._id;

const note = await Note.findOneAndUpdate(
{
_id: id,
user: userId,
},
{
trashed: true,
trashedAt: new Date(),
},
{
new: true,
}
);

if (!note) {
const error = new Error("Note not found");
error.statusCode = 404;
throw error;
}

res.status(200).json({
success: true,
data: note,
});
});

export const permanentDeleteNote = asyncHandler(async (req, res) => {
const { id } = req.params;
const userId = req.user._id;

const note = await Note.findOneAndDelete({
_id: id,
user: userId,
trashed: true,
});

if (!note) {
const error = new Error(
"Note not found in trash"
);
error.statusCode = 404;
throw error;
}

res.status(200).json({
success: true,
data: {
message: "Note permanently deleted",
},
});
});

export const restoreNote = asyncHandler(async (req, res) => {
const { id } = req.params;
const userId = req.user._id;

const note = await Note.findOneAndUpdate(
{
_id: id,
user: userId,
},
{
trashed: false,
trashedAt: null,
},
{
new: true,
}
);

if (!note) {
const error = new Error("Note not found");
error.statusCode = 404;
throw error;
}

res.status(200).json({
success: true,
data: note,
});
});

export const searchNotes = asyncHandler(
  async (req, res) => {
    const { q } = req.query;
    const userId = req.user._id;

    if (!q || q.trim() === "") {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const notes =
      await Note.searchNotes(
        userId,
        q.trim()
      );

    res.status(200).json({
      success: true,
      data: notes,
    });
  }
);
