import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth Context

/**
 * Fleura Navbar 🌸
 * - Light pastel header (soft mint/pink)
 * - Dynamic Login/Register vs User Greeting + Logout
 * - Centered brand
 * - Scrolls naturally with page (not sticky)
 */

export default function Nav() {
  const { pathname } = useLocation();
  const { totalItems } = useCart();
  const { user, logout } = useAuth(); // ✅ Get user & logout function

  // Helper function for links
  const navLink = (path, label) => (
    <Link
      to={path}
      style={{
        margin: "0 16px",
        textDecoration: "none",
        color: pathname === path ? "#ff4f84" : "#222",
        fontWeight: pathname === path ? "700" : "500",
        fontSize: "1rem",
        transition: "color 0.3s ease",
      }}
    >
      {label}
    </Link>
  );

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#bfedeb72", // soft pastel mint header
        boxShadow: "0 1px 6px rgba(10,10,10,0.06)",
        padding: "14px 0 22px 0",
        position: "relative", // scrolls naturally
      }}
    >
      {/* Brand centered */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "2.8rem", transform: "translateY(-1px)" }}>🌸</span>
          <h1
            style={{
              fontSize: "2.9rem",
              fontWeight: 800,
              color: "#111",
              margin: 0,
              letterSpacing: "0.6px",
            }}
          >
            FLEURA
          </h1>
        </div>
      </div>

      {/* Navigation Links centered */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "36px",
          alignItems: "center",
        }}
      >
        {navLink("/", "Home")}

        {/* ✅ Conditional Auth Links */}
        {!user ? (
          <>
            {navLink("/login", "Login")}
            {navLink("/register", "Register")}
          </>
        ) : (
          <>
            <span style={{ fontWeight: "600", color: "#111" }}>
              Hi, {user.name || "User"} 👋
            </span>
            <button
              onClick={logout}
              style={{
                backgroundColor: "#ff4f84",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          </>
        )}

        {navLink("/contact", "Contact")}
        {navLink("/admin", "Admin")}

        {/* Cart Link */}
        <Link
          to="/cart"
          style={{
            marginLeft: 12,
            textDecoration: "none",
            color: "#111",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          🧺 Cart ({totalItems})
        </Link>
      </nav>
    </header>
  );
}
