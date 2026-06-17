import Label from "../models/labels.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createLabel = asyncHandler(async (req, res) => {
const { labelName } = req.body;
const userId = req.user._id;

if (!userId) {
const error = new Error("User not authorized");
error.statusCode = 401;
throw error;
}

const existingLabel = await Label.findOne({
name: labelName,
user: userId,
});

if (existingLabel) {
const error = new Error(
"Label already exists for this user"
);
error.statusCode = 409;
throw error;
}

const newLabel = await Label.create({
name: labelName,
user: userId,
});

res.status(201).json({
success: true,
data: newLabel,
});
});

export const getLabel = asyncHandler(async (req, res) => {
const userId = req.user._id;

if (!userId) {
const error = new Error("User not authorized");
error.statusCode = 401;
throw error;
}

const labels = await Label.find({
user: userId,
}).sort({ createdAt: -1 });

res.status(200).json({
success: true,
data: labels,
});
});

export const updateLabel = asyncHandler(async (req, res) => {
const { id } = req.params;
const { newName } = req.body;
const userId = req.user._id;

if (!userId) {
const error = new Error("User not authorized");
error.statusCode = 401;
throw error;
}

const updatedLabel = await Label.findOneAndUpdate(
{
_id: id,
user: userId,
},
{
name: newName,
},
{
new: true,
runValidators: true,
}
);

if (!updatedLabel) {
const error = new Error(
"Label not found or unauthorized"
);
error.statusCode = 404;
throw error;
}

res.status(200).json({
success: true,
data: updatedLabel,
});
});

export const deleteLabel = asyncHandler(async (req, res) => {
const { id } = req.params;
const userId = req.user._id;

if (!userId) {
const error = new Error("User not authorized");
error.statusCode = 401;
throw error;
}

const deletedLabel = await Label.findOneAndDelete({
_id: id,
user: userId,
});

if (!deletedLabel) {
const error = new Error(
"Label not found or unauthorized"
);
error.statusCode = 404;
throw error;
}

res.status(200).json({
success: true,
data: deletedLabel,
});
});
