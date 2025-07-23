import Category from "../models/Category.models.js";

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name ) {
      return res.status(400).json({ message: "Name required" });
    }

    // Prevent duplicate category for same user
    const exists = await Category.findOne({
      user: req.user._id,
      name: name.toLowerCase()
    });

    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      user: req.user._id,
      name: name.toLowerCase(),
    });

    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all categories for a user
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id })
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.user._id });

    if (!category || category.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category || category.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }

    const newName = name?.toLowerCase().trim();

    // If name is changing → check for duplicate
    if (
      (newName && newName !== category.name)
    ) {
      const duplicate = await Category.findOne({
        user: req.user._id,
        name: newName || category.name,
      });

      if (duplicate && duplicate._id.toString() !== category._id.toString()) {
        return res.status(400).json({ message: "Category with same name already exists" });
      }
    }

    // Apply updates
    if (newName) category.name = newName;

    const updated = await category.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
