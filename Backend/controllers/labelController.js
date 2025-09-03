import Label from "../models/labels.js";


async function createLabel(req, res) {
  try {
    const { labelName } = req.body;
    const userId = req.user?._id || req.body.user;

    if (!userId) return res.status(401).json({ error: "User not authorised" });

    const existingLabel = await Label.findOne({ name: labelName, user: userId });
    if (existingLabel) {
      return res.status(409).json({ error: "Label already exists for this user" });
    }

    const newLabel = await Label.create({ name: labelName, user: userId });
    res.status(201).json({ message: "Label created", label: newLabel });
  } catch (error) {
    console.error("Label creation error:", error.message);
    res.status(500).json({ error: "Failed to create label" });
  }
}


async function getLabel(req, res) {
  try {
    const userId = req.user?._id || req.body.user;
    if (!userId) return res.status(401).json({ error: "User not authorised" });

    const labels = await Label.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ labels });
  } catch (error) {
    console.error("Error fetching labels:", error.message);
    res.status(500).json({ error: "Failed to fetch labels" });
  }
}


async function updateLabel(req, res) {
  try {
    const { id } = req.params;
    const { newName } = req.body;
    const userId = req.user?._id || req.body.user;

    if (!userId) return res.status(401).json({ error: "User not authorised" });

    const updatedLabel = await Label.findOneAndUpdate(
      { _id: id, user: userId },
      { name: newName },
      { new: true }
    );

    if (!updatedLabel) {
      return res.status(404).json({ error: "Label not found or unauthorized" });
    }

    res.status(200).json({ message: "Label updated", label: updatedLabel });
  } catch (error) {
    console.error("Error updating label:", error.message);
    res.status(500).json({ error: "Failed to update label" });
  }
}


async function deleteLabel(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.body.user;

    if (!userId) return res.status(401).json({ error: "User not authorised" });

    const deletedLabel = await Label.findOneAndDelete({ _id: id, user: userId });

    if (!deletedLabel) {
      return res.status(404).json({ error: "Label not found or unauthorized" });
    }

    res.status(200).json({ message: "Label deleted", label: deletedLabel });
  } catch (error) {
    console.error("Error deleting label:", error.message);
    res.status(500).json({ error: "Failed to delete label" });
  }
}

export { createLabel, getLabel, updateLabel, deleteLabel };
