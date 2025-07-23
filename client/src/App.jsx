import { Routes, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Expense from "./pages/Expense";
import PrivateRoute from "./components/PrivateRoute";
import Income from "./pages/Income";
import Category from "./pages/Category";
import Source from "./pages/Source";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";

const App =
  createBrowserRouter(
    createRoutesFromElements(
      <Route>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element = {<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
        <Route path="income" element={<PrivateRoute><Income /></PrivateRoute>} />
        <Route path="category" element={<PrivateRoute><Category /></PrivateRoute>} />
        <Route path="source" element={<PrivateRoute><Source /></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        

        {/* Optional fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Route>
    </Route>
    )
  )

  // function App() {
  //   const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const userData = localStorage.getItem("userData");

  //   if (token && userData) {
  //     dispatch(
  //       login({
  //         token,
  //         userData: JSON.parse(userData),
  //       })
  //     );
  //   }
  // }, [dispatch]);
  // }

export {App};
