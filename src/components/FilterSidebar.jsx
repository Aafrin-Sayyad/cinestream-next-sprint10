"use client";

// sidebar filter - sprint 10 phase 2
// all filter state lives in redux, not local useState
// when user clicks a chip it dispatches to global store
// MovieGrid reads from same store and updates instantly

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setGenre, setMinRating, setYear, setSortBy, resetFilters } from "@/store/store";

const GENRES = ["All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Thriller", "Animation"];
const YEARS = ["All", "2026", "2025", "2024", "2023", "2022"];
const RATINGS = [
  { label: "Any", val: 0 },
  { label: "6+", val: 6 },
  { label: "7+", val: 7 },
  { label: "8+", val: 8 },
  { label: "9+", val: 9 },
];
const SORT_OPTIONS = [
  { label: "Popular", val: "popularity" },
  { label: "Top Rated", val: "rating" },
  { label: "Newest", val: "year" },
];

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  // useCallback so these dont get recreated on every render - phase 3 optimization
  const handleGenre = useCallback((g) => dispatch(setGenre(g)), [dispatch]);
  const handleRating = useCallback((r) => dispatch(setMinRating(r)), [dispatch]);
  const handleYear = useCallback((y) => dispatch(setYear(y)), [dispatch]);
  const handleSort = useCallback((s) => dispatch(setSortBy(s)), [dispatch]);
  const handleReset = useCallback(() => dispatch(resetFilters()), [dispatch]);

  // reusable chip button
  function Chip({ label, active, onClick }) {
    return (
      <button
        onClick={onClick}
        style={{
          background: active ? "#e50914" : "#2a2a2a",
          color: active ? "#fff" : "#aaa",
          border: `1.5px solid ${active ? "#e50914" : "#444"}`,
          borderRadius: "999px",
          padding: "5px 11px",
          fontSize: "0.72rem",
          fontWeight: 600,
          cursor: "pointer",
          margin: "3px 3px 3px 0",
          transition: "all 0.15s",
        }}
      >
        {label}
      </button>
    );
  }

  function SectionLabel({ text }) {
    return (
      <p style={{
        fontSize: "0.63rem",
        fontWeight: 800,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#666",
        marginBottom: "8px",
      }}>
        {text}
      </p>
    );
  }

  return (
    <aside style={{
      width: "210px",
      flexShrink: 0,
      background: "#1a1a1a",
      border: "1px solid #2a2a2a",
      borderRadius: "12px",
      padding: "20px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      alignSelf: "flex-start",
      position: "sticky",
      top: "72px",
    }}>

      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "#fff" }}>
          🎬 Filters
        </span>
        <button
          onClick={handleReset}
          style={{
            background: "none",
            border: "none",
            color: "#e50914",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.72rem",
          }}
        >
          Reset
        </button>
      </div>

      {/* genre */}
      <div>
        <SectionLabel text="Genre" />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {GENRES.map((g) => (
            <Chip key={g} label={g} active={filters.genre === g} onClick={() => handleGenre(g)} />
          ))}
        </div>
      </div>

      {/* min rating */}
      <div>
        <SectionLabel text="Min Rating" />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {RATINGS.map((r) => (
            <Chip key={r.label} label={r.label} active={filters.minRating === r.val} onClick={() => handleRating(r.val)} />
          ))}
        </div>
      </div>

      {/* year */}
      <div>
        <SectionLabel text="Year" />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {YEARS.map((y) => (
            <Chip key={y} label={y} active={filters.year === y} onClick={() => handleYear(y)} />
          ))}
        </div>
      </div>

      {/* sort by */}
      <div>
        <SectionLabel text="Sort By" />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {SORT_OPTIONS.map((s) => (
            <Chip key={s.val} label={s.label} active={filters.sortBy === s.val} onClick={() => handleSort(s.val)} />
          ))}
        </div>
      </div>

    </aside>
  );
}
