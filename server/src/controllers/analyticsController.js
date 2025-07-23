import Expense from "../models/Expense.models.js";
import Income from "../models/Income.models.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const allExpenses = await Expense.find({ user: userId });
    const allIncomes = await Income.find({ user: userId });

    const now = new Date();
    const currentMonth = now.getMonth(); // 0-indexed
    const currentYear = now.getFullYear();

    const filterByDate = (arr, isIncome = false) =>
      arr.filter((item) => {
        const date = new Date(item.date);
        return (
          date.getFullYear() === currentYear &&
          date.getMonth() === currentMonth
        );
      });

    const sum = (arr) => arr.reduce((acc, val) => acc + val.amount, 0);

    const totalExpense = sum(allExpenses);
    const totalIncome = sum(allIncomes);
    const balance = totalIncome - totalExpense;

    const monthlyExpense = sum(filterByDate(allExpenses));
    const monthlyIncome = sum(filterByDate(allIncomes));

    const yearlyExpense = sum(
      allExpenses.filter((e) => new Date(e.date).getFullYear() === currentYear)
    );

    const yearlyIncome = sum(
      allIncomes.filter((i) => new Date(i.date).getFullYear() === currentYear)
    );

    const Expenses = await Expense.find({ user: userId }).populate({
    path: "category",
    select: "name",
    });

    const Incomes = await Income.find({ user: userId }).populate({
    path: "source",
    select: "name",
    });


    // Expense Breakdown by Category
    const categoryBreakdown = {};
    Expenses.forEach((expense) => {
    const categoryName = expense.category?.name || "Uncategorized";
    categoryBreakdown[categoryName] =
    (categoryBreakdown[categoryName] || 0) + expense.amount;
    });

    // Income Breakdown by Source
      const sourceBreakdown = {};
      Incomes.forEach((income) => {
      const sourceName = income.source?.name || "Uncategorized";
      sourceBreakdown[sourceName] =
        (sourceBreakdown[sourceName] || 0) + income.amount;
    });
    

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      monthlyIncome,
      monthlyExpense,
      yearlyIncome,
      yearlyExpense,
      categoryBreakdown,
      sourceBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlyTrend = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();
    const months = [];
    const income = [];
    const expense = [];

    // Get data for the past 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleString("default", { month: "short" }); // Jan, Feb, etc.
      const year = date.getFullYear();
      const monthIndex = date.getMonth();

      months.push(month);

      // Filter by user + date range
      const monthStart = new Date(year, monthIndex, 1);
      const monthEnd = new Date(year, monthIndex + 1, 0, 23, 59, 59);

      const monthlyIncomes = await Income.find({
        user: userId,
        date: { $gte: monthStart, $lte: monthEnd }
      });

      const monthlyExpenses = await Expense.find({
        user: userId,
        date: { $gte: monthStart, $lte: monthEnd }
      });

      const sumIncome = monthlyIncomes.reduce((acc, i) => acc + i.amount, 0);
      const sumExpense = monthlyExpenses.reduce((acc, e) => acc + e.amount, 0);

      income.push(sumIncome);
      expense.push(sumExpense);
    }

    res.status(200).json({
      months,
      income,
      expense
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlyCategoryBreakdown = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const results = {};

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = date.toLocaleString("default", { month: "short" });

      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

      const expenses = await Expense.find({
        user: userId,
        date: { $gte: start, $lte: end }
      }).populate("category", "name");

      const breakdown = {};

      expenses.forEach((e) => {
        const category = e.category?.name || "Uncategorized";
        breakdown[category] = (breakdown[category] || 0) + e.amount;
      });

      results[monthLabel] = breakdown;
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMonthlySourceBreakdown = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const results = {};

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = date.toLocaleString("default", { month: "short" });

      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

      const incomes = await Income.find({
        user: userId,
        date: { $gte: start, $lte: end }
      }).populate("source", "name");

      const breakdown = {};

      incomes.forEach((e) => {
        const source = e.source?.name || "Uncategorized";
        breakdown[source] = (breakdown[source] || 0) + e.amount;
      });

      results[monthLabel] = breakdown;
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

