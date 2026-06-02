"use client";

// navbar component - sprint 10
// added theme toggle button that dispatches to redux themeSlice
// favorites count also comes from redux now

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const favCount = useSelector((state) => state.favorites.items.length);

  const isDark = themeMode === "dark";

  return (
    <nav className="navbar">
      {/* logo */}
      <Link href="/" className="logo">
        CineStream
      </Link>

      {/* right side */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/favorites">
            Favorites {favCount > 0 ? `(${favCount})` : ""}
          </Link>
        </div>

        {/* theme toggle - dispatches to redux themeSlice */}
        <button
          onClick={() => dispatch(toggleTheme())}
          style={{
            background: isDark ? "#1f1f1f" : "#e0e0e0",
            border: "1px solid #444",
            borderRadius: "20px",
            padding: "6px 14px",
            cursor: "pointer",
            fontSize: "0.8rem",
            color: isDark ? "#fff" : "#111",
            fontWeight: 600,
          }}
        >
          {isDark ? "☀ Light" : "☾ Dark"}
        </button>
      </div>
    </nav>
  );
}
