"use client";

// this needs to be a client component because:
// 1. infinite scroll uses IntersectionObserver (browser API)
// 2. redux useSelector / useDispatch needs client side
// 3. useState for movies list and page number

// sprint 10 changes from sprint 9:
// - removed localStorage favorites, moved to redux favoritesSlice
// - reads filter state from redux filtersSlice
// - useMemo so filter logic doesnt run on every single render

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "@/store/store";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ initialMovies, totalPages }) {
  const [movies, setMovies] = useState(initialMovies || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // sprint 10 - reading from redux instead of local state
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.favorites.items);
  const filters = useSelector((state) => state.filters);

  const sentinelRef = useRef(null);

  // infinite scroll - same as sprint 9
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "300px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loading, page, totalPages]);

  // fetch more movies when page changes
  useEffect(() => {
    if (page === 1) return; // skip first page, already have from server

    const fetchMore = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
        );
        const data = await res.json();
        setMovies((prev) => [...prev, ...data.results]);
      } catch (err) {
        console.error("error loading more movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMore();
  }, [page]);

  // sprint 10 phase 3 - useMemo so filtering only runs when movies or filters change
  // without this, it would re-filter on every single render which is expensive
  const filteredMovies = useMemo(() => {
    let result = movies.filter((m) => {
      const ratingOk = (m.vote_average ?? 0) >= filters.minRating;
      const yearOk = filters.year === "All" || (m.release_date ?? "").startsWith(filters.year);
      return ratingOk && yearOk;
    });

    // sorting
    if (filters.sortBy === "rating") {
      result = [...result].sort((a, b) => b.vote_average - a.vote_average);
    } else if (filters.sortBy === "year") {
      result = [...result].sort((a, b) =>
        (b.release_date ?? "").localeCompare(a.release_date ?? "")
      );
    }
    // popularity = default api order, no sorting needed

    return result;
  }, [movies, filters]);

  // check if movie is in favorites - reads from redux
  function isFav(id) {
    return favItems.some((m) => m.id === id);
  }

  return (
    <>
      <div className="movie-grid" style={{ flex: 1 }}>
        {filteredMovies.map((movie, index) => {
          const imgSrc = movie.poster_path
            ? `${IMG_BASE}${movie.poster_path}`
            : "/no-image.png";

          const year = movie.release_date
            ? movie.release_date.slice(0, 4)
            : "N/A";

          return (
            <div key={`${movie.id}-${index}`} style={{ position: "relative" }}>
              <Link href={`/movie/${movie.id}`} className="movie-card">
                <Image
                  src={imgSrc}
                  alt={movie.title}
                  width={180}
                  height={270}
                  style={{ width: "100%", height: "270px", objectFit: "cover" }}
                />
                <div className="card-info">
                  <h3>{movie.title}</h3>
                  <div className="card-meta">
                    <span>{year}</span>
                    <span className="rating">
                      ⭐ {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>

              {/* heart button - dispatches to redux favoritesSlice now */}
              <button
                onClick={() => dispatch(toggleFavorite(movie))}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isFav(movie.id) ? "❤️" : "🤍"}
              </button>
            </div>
          );
        })}
      </div>

      {/* sentinel - triggers infinite scroll when visible */}
      <div ref={sentinelRef} className="sentinel" />

      {loading && <p className="loading-text">Loading more movies...</p>}
    </>
  );
}
