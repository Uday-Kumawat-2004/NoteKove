import Label from "../models/labels.js";

async function createLabel(req, res) {
  try {
    const { labelName } = req.body;
    const userId = req.user?._id || req.body.user;

    if (!userId) return res.status(401).json({ error: "User not authorised" });

    const existingLabel = await Label.findOne({
      name: labelName,
      user: userId,
    });

    if (existingLabel) {
      return res
        .status(409)
        .json({ error: "Label already exists for this user" });
    }

    const newLabel = await Label.create({
      name: labelName,
      user: userId,
    });

    res.status(201).json({ message: "Label created", label: newLabel });

  } catch (error) {
    console.error("Note creation error:", error.message);
    res.status(500).json({ error: "Failed to create label" });
  }
}

async function getLabel(req, res) {
  try {
    const userId = req.user?._id || req.body.user;

    if (!userId) {
      return res.status(401).json({ error: "User not authorised" });
    }

    const labels = await Label.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ labels });
  } catch (error) {
    console.error("Error fetching labels:", error.message);
    res.status(500).json({ error: "Failed to fetch labels" });
  }
}

export { createLabel, getLabel };
