import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import api from "../api/axios";
import { useSelector } from "react-redux";

const Source = () => {
  const { token } = useSelector((state) => state.auth);
  const [sources, setSources] = useState([]);
  const [newSource, setNewSource] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const fetchSources = async () => {
    try {
      const res = await api.get("/api/sources", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSources(res.data);
    } catch (err) {
      alert("Error fetching sources");
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSource.trim()) return;
    try {
      await api.post(
        "/api/sources",
        { name: newSource },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewSource("");
      fetchSources();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add source");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this source?")) return;
    try {
      await api.delete(`/api/sources/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSources();
    } catch (err) {
      alert("Failed to delete source");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(
        `/api/sources/${id}`,
        { name: editedName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditedName("");
      fetchSources();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Manage Sources of Incomes🔗</h2>

        {/* Add New Source */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
            placeholder="Add new source"
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            <FiPlus />
          </button>
        </form>

        {/* Source List */}
        <ul className="space-y-3">
          {sources.map((cat) => (
            <li
              key={cat._id}
              className="flex justify-between items-center border p-3 rounded-md hover:bg-gray-100"
            >
              {editingId === cat._id ? (
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="flex-1 mr-4 border rounded px-2 py-1"
                />
              ) : (
                <span className="capitalize">{cat.name}</span>
              )}

              <div className="flex gap-3">
                {editingId === cat._id ? (
                  <button
                    onClick={() => handleUpdate(cat._id)}
                    className="text-green-600 font-semibold"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(cat._id);
                      setEditedName(cat.name);
                    }}
                    className="text-blue-600"
                  >
                    <FiEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Source;
