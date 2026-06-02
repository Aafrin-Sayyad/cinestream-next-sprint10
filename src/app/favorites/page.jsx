"use client";

// favorites page - sprint 10
// switched from localStorage to redux favoritesSlice
// no more useEffect to read from localStorage

import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "@/store/store";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  // reading favorites directly from redux store
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div className="page-wrapper">
      <h2 className="page-title">My Favorites ❤️</h2>

      {favorites.length === 0 ? (
        <div>
          <p className="empty-msg">
            You haven&apos;t added any favorites yet.
          </p>
          <Link
            href="/"
            style={{ color: "#e50914", display: "inline-block", marginTop: "12px" }}
          >
            Browse movies →
          </Link>
        </div>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => {
            const imgSrc = movie.poster_path
              ? `${IMG_BASE}${movie.poster_path}`
              : "/no-image.png";
            const year = movie.release_date?.slice(0, 4) || "N/A";

            return (
              <div key={movie.id} style={{ position: "relative" }}>
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

                {/* dispatches to redux instead of localStorage now */}
                <button
                  onClick={() => dispatch(toggleFavorite(movie))}
                  title="Remove from favorites"
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
                  ❤️
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
