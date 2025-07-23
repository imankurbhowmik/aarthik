import Income from "../models/Income.models.js";

// @desc    Add new income
// @route   POST /api/incomes
export const addIncome = async (req, res) => {
  try {
    const { amount, source, description, date } = req.body;

    if (!amount || !source) {
      return res.status(400).json({ message: "Amount and source are required" });
    }

    const income = new Income({
      user: req.user._id,
      amount,
      source,
      description,
      date: date || new Date(),
    });

    const saved = await income.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all incomes for logged-in user
// @route   GET /api/incomes
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete an income
// @route   DELETE /api/incomes/:id
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) return res.status(404).json({ message: "Income not found" });

    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await income.remove();
    res.status(200).json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update an income (optional)
// @route   PUT /api/incomes/:id
export const updateIncome = async (req, res) => {
  try {
    const { amount, source, description, date } = req.body;
    const income = await Income.findById(req.params.id);

    if (!income) return res.status(404).json({ message: "Income not found" });

    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    income.amount = amount ?? income.amount;
    income.source = source ?? income.source;
    income.description = description ?? income.description;
    income.date = date ?? income.date;

    const updated = await income.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
