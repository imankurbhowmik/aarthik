import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiLogIn,
  FiUserPlus,
  FiPieChart,
  FiTrendingDown,
  FiTrendingUp,
  FiLayers,
  FiDatabase,
  FiUser,
  FiHome,
} from "react-icons/fi";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo + Name */}
        <Link to="/home" className="flex items-center gap-2 shrink-0">
          <svg
            width="28"
            height="28"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="min-w-[28px] sm:min-w-[36px] sm:w-[36px] sm:h-[36px]"
          >
            <rect width="120" height="120" rx="24" fill="#1A1A2E" />
            <path
              d="M30 80L45 50L60 80L75 50L90 80"
              stroke="#4F46E5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="45" cy="50" r="5" fill="#4F46E5" />
            <circle cx="75" cy="50" r="5" fill="#4F46E5" />
          </svg>
          <span className="text-base sm:text-lg font-bold text-indigo-600 tracking-wide leading-none">
            Aarthik
          </span>
        </Link>

        {/* Nav Items */}
        {!authStatus ? (
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition" title="Home">
              <FiHome size={20} />
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition" title="Login">
              <FiLogIn size={20} />
            </Link>
            <Link to="/signup" className="text-gray-700 hover:text-indigo-600 transition" title="Signup">
              <FiUserPlus size={20} />
            </Link>
          </div>
        ) : (
          <nav className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link to="/" title="Home" className="text-gray-700 hover:text-indigo-600 transition">
              <FiHome size={20} />
            </Link>
            <Link to="/dashboard" title="Dashboard" className="text-gray-700 hover:text-indigo-600 transition">
              <FiPieChart size={20} />
            </Link>
            <Link to="/expense" title="Expenses" className="text-gray-700 hover:text-red-500 transition">
              <FiTrendingDown size={20} />
            </Link>
            <Link to="/income" title="Incomes" className="text-gray-700 hover:text-green-500 transition">
              <FiTrendingUp size={20} />
            </Link>
            <Link to="/category" title="Categories" className="text-gray-700 hover:text-blue-500 transition">
              <FiLayers size={20} />
            </Link>
            <Link to="/source" title="Sources" className="text-gray-700 hover:text-teal-500 transition">
              <FiDatabase size={20} />
            </Link>
            <Link to="/profile" title="Profile" className="text-gray-700 hover:text-yellow-500 transition">
              <FiUser size={20} />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;




