// server component - no "use client"
// data fetching on server side, no useEffect needed
// sprint 10 change - added FilterSidebar next to MovieGrid

import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";

export const dynamic = "force-dynamic";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function getPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch movies");
  }

  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const data = await getPopularMovies();
  const movies = data.results;
  const totalPages = data.total_pages;

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Popular Movies</h2>

      <SearchBar />

      {/* sprint 10 - sidebar + grid side by side */}
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginTop: "20px" }}>
        <FilterSidebar />
        <MovieGrid initialMovies={movies} totalPages={totalPages} />
      </div>
    </div>
  );
}
