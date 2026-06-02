"use client";

// had to add "use client" because this uses onChange and useState
// server components cant do that

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// custom debounce hook - same one from sprint 8
function useDebounce(val, delay) {
  const [delayed, setDelayed] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => setDelayed(val), delay);
    return () => clearTimeout(timer);
  }, [val, delay]);

  return delayed;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      router.push("/");
    } else {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`);
    }
  }, [debouncedQuery]);

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
