import Source from "../models/Source.models.js";

// Create new source
export const createSource = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required" });
    }

    // Prevent duplicate source for same user
    const exists = await Source.findOne({
      user: req.user._id,
      name: name.toLowerCase(),
    });

    if (exists) {
      return res.status(400).json({ message: "Source already exists" });
    }

    const source = new Source({
      user: req.user._id,
      name: name.toLowerCase()
    });

    const saved = await source.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all sources for a user
export const getSources = async (req, res) => {
  try {
    const sources = await Source.find({ user: req.user._id });
    res.status(200).json(sources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a source
export const deleteSource = async (req, res) => {
  try {
    const source = await Source.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!source || source.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Source not found or unauthorized" });
    }

    await Source.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Source deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update source
export const updateSource = async (req, res) => {
  try {
    const { name } = req.body;

    const source = await Source.findById(req.params.id);

    if (!source || source.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Source not found or unauthorized" });
    }

    const newName = name?.toLowerCase().trim();
    

    // If name is changing → check for duplicate
    if (
      (newName && newName !== source.name)   
    ) {
      const duplicate = await Source.findOne({
        user: req.user._id,
        name: newName || source.name
      });

      if (duplicate && duplicate._id.toString() !== source._id.toString()) {
        return res.status(400).json({ message: "Source with same name already exists" });
      }
    }

    // Apply updates
    if (newName) source.name = newName;

    const updated = await source.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};