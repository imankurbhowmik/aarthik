import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-600 tracking-wide hover:opacity-90 transition"
        >
          Arthik
        </Link>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 font-medium">
          <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy</Link>
          <Link to="/terms" className="hover:text-indigo-600 transition">Terms</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
          <Link to="/support" className="hover:text-indigo-600 transition">Support</Link>
        </div>

        {/* Right: Social / Contact */}
        <div className="flex gap-4 text-gray-500 text-lg">
          <a
            href="mailto:support@arthik.com"
            className="hover:text-indigo-600 transition"
            title="Email us"
          >
            <FiMail />
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition"
            title="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition"
            title="LinkedIn"
          >
            <FiLinkedin />
          </a>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-gray-100 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Arthik. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

