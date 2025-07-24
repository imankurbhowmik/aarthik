import React, { useEffect, useState } from "react";
import api from "../api/axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const Expense = () => {
  const { token } = useSelector((state) => state.auth);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: dayjs().format("YYYY-MM-DD"),
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/api/expenses", {
        headers: { Authorization: `Bearer ${token}`},
      });
      setExpenses(res.data);
    } catch (err) {
      alert("Failed to fetch expenses");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories",
        {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      setCategories(res.data);
    } catch (err) {
      alert("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/api/expenses/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      } else {
        await api.post("/api/expenses", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      }
      fetchExpenses();
      setForm({ amount: "", category: "", description: "", date: dayjs().format("YYYY-MM-DD") });
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save expense");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setForm({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: dayjs(expense.date).format("YYYY-MM-DD"),
    });
    setEditingId(expense._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await api.delete(`/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
        Manage Expenses 💸
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            placeholder="Amount"
            className="border rounded px-3 py-2 w-full"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={loading}
        >
          {editingId ? "Update" : "Add"} Expense
        </button>
      </form>

      {/* Expense List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Expenses</h3>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp._id} className="border-t">
                    <td className="px-4 py-2">₹{exp.amount}</td>
                    <td className="px-4 py-2">
                      {categories.find((c) => c._id === exp.category)?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-2">{exp.description || "-"}</td>
                    <td className="px-4 py-2">{dayjs(exp.date).format("MMM D, YYYY")}</td>
                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;

