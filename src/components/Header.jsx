// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 shadow-md flex items-center justify-between">
      {/* Logo or Home Link */}
      <Link to="/" className="text-2xl font-bold hover:text-orange-400">
        🛍️ ElectroMart
      </Link>

      {/* Right Side Navigation */}
      <nav className="flex gap-4 items-center">
        <Link to="/cart" className="hover:text-orange-400">
          🛒 Cart
        </Link>

        {!token ? (
          <>
            <Link to="/login" className="hover:text-orange-400">
              Login
            </Link>
            <Link to="/signup" className="hover:text-orange-400">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-300 hidden sm:inline">
              Hi, {user?.firstName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
