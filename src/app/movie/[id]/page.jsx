// server component - runs on server
// SEO benefits from sprint 9 kept intact
// only change is FavButton now uses redux internally

import Image from "next/image";
import Link from "next/link";
import FavButton from "@/components/FavButton";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function getMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    {
      next: { revalidate: 86400 }, // cache for 24 hours
    }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return { title: "Movie not found - CineStream" };
  }

  const desc = movie.overview
    ? movie.overview.slice(0, 155) + "..."
    : "Watch on CineStream";

  return {
    title: `${movie.title} (${movie.release_date?.slice(0, 4)}) - CineStream`,
    description: desc,
  };
}

export default async function MovieDetailPage({ params }) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return (
      <div className="detail-wrapper">
        <p className="error-text">Movie not found.</p>
        <Link href="/" className="back-link">← Go back</Link>
      </div>
    );
  }

  const imgSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.png";

  return (
    <div className="detail-wrapper">
      <Link href="/" className="back-link">← Back to Home</Link>

      <div className="detail-top">
        <Image
          src={imgSrc}
          alt={movie.title}
          width={260}
          height={390}
          style={{ borderRadius: "8px" }}
        />

        <div className="detail-info">
          <h1>{movie.title}</h1>

          {movie.genres && movie.genres.length > 0 && (
            <div className="genres">
              {movie.genres.map((g) => (
                <span key={g.id} className="genre-tag">{g.name}</span>
              ))}
            </div>
          )}

          <p><strong>Release:</strong> {movie.release_date || "Unknown"}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10</p>
          <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : "N/A"}</p>
          <p style={{ marginTop: "14px" }}>{movie.overview}</p>

          {/* FavButton is client component - now uses redux internally */}
          <FavButton movie={movie} />
        </div>
      </div>
    </div>
  );
}
