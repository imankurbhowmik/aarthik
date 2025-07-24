import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axios";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changePassForm, setChangePassForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [passMsg, setPassMsg] = useState("");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("User fetch failed:", err);
        alert("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handlePassChange = (e) => {
    setChangePassForm({ ...changePassForm, [e.target.name]: e.target.value });
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        "/api/user/change-password",
        changePassForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPassMsg("✅ Password changed successfully");
      setChangePassForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      setPassMsg(err.response?.data?.message || "Password change failed");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/"); // Redirect to home after logout
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">👤 Profile</h2>

      <div className="space-y-3 mb-6">
        <p><span className="font-semibold">Name:</span> {user?.name}</p>
        <p><span className="font-semibold">Email:</span> {user?.email}</p>
        <p><span className="font-semibold">Joined:</span> {new Date(user?.createdAt).toLocaleDateString('en-IN')}</p>
      </div>

      <hr className="my-6" />

      <form onSubmit={submitPasswordChange} className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">🔒 Change Password</h3>

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={changePassForm.currentPassword}
          onChange={handlePassChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={changePassForm.newPassword}
          onChange={handlePassChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        {passMsg && <p className="text-sm text-center text-red-500">{passMsg}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Update Password
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="w-full mt-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
      >
         Logout
      </button>
    </div>
  );
};

export default Profile;


