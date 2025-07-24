import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (token && userData && userData !== "undefined") {
      try {
        const parsed = JSON.parse(userData);
        dispatch(login({ userData: parsed, token }));
      } catch (err) {
        console.error("Corrupt user data");
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }else{
      dispatch(logout());
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-gray-800">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

