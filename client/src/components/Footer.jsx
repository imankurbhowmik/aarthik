import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-600 tracking-wide hover:opacity-90 transition"
        >
          Aarthik
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
            href="https://twitter.com/iamankurbhowmik"
            target="_blank"
            className="hover:text-indigo-600 transition"
            title="Twitter"
          >
            <FiTwitter />
          </a>
          <a
            href="https://github.com/imankurbhowmik"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition"
            title="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ankur-bhowmik-83921b18b/"
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
        &copy; {new Date().getFullYear()} Aarthik. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

