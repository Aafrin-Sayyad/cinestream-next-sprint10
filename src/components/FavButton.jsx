"use client";

// fav button on movie detail page
// sprint 10 - switched from localStorage to redux favoritesSlice
// dispatches toggleFavorite action instead of manually writing to localStorage

import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/store";

export default function FavButton({ movie }) {
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.favorites.items);

  // check if this movie is in favorites from redux store
  const isFav = favItems.some((m) => m.id === movie.id);

  function handleClick() {
    dispatch(toggleFavorite(movie));
  }

  return (
    <button className="fav-btn" onClick={handleClick}>
      {isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
}
