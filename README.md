# CineStream - Sprint 10

## What I built

This is my CineStream movie app upgraded with Redux Toolkit for global state management. I was using Context API and localStorage before this sprint, and now everything is managed through a central Redux store.

## Tech Stack

- Next.js 15
- Redux Toolkit
- react-redux
- TMDB API

## What changed from Sprint 9

In sprint 9 I had favorites stored in localStorage and filter state was just local useState inside components. The problem was when I wanted to show favorites count in the navbar, I couldn't easily access that data without prop drilling.

This sprint I moved everything to Redux:
- Favorites → favoritesSlice
- Filters → filtersSlice  
- Dark/Light theme → themeSlice

## How to run locally

1. Clone the repo
2. Run `npm install`
3. Create a `.env.local` file and add your TMDB API key:
```
NEXT_PUBLIC_TMDB_KEY=your_key_here
```
4. Run `npm run dev`
5. Open `localhost:3000`

## Folder structure

```
src/
├── store/
│   └── store.js         # redux store and all slices
├── app/
│   ├── page.jsx         # home page
│   ├── layout.jsx       # root layout with provider
│   ├── globals.css
│   ├── favorites/
│   │   └── page.jsx
│   └── movie/
│       └── [id]/
│           └── page.jsx
└── components/
    ├── ReduxProvider.jsx
    ├── Navbar.jsx
    ├── FilterSidebar.jsx
    ├── MovieGrid.jsx
    ├── SearchBar.jsx
    └── FavButton.jsx
```

## Features

- Browse popular movies from TMDB API
- Infinite scroll
- Search movies
- Filter by rating, year, sort order
- Add/remove favorites (stored in Redux)
- Dark/Light mode toggle
- Movie detail page with SEO metadata

## What I learned

Honestly Redux was confusing at first. I kept getting errors about the Provider not wrapping things correctly. The main thing I understood is that you need the Provider at the root level, and then any component can read from the store using useSelector and write to it using dispatch.

The useMemo hook was also new to me this sprint. Without it, every time any state changes the entire movie list gets filtered again which is wasteful. With useMemo it only re-filters when the filters actually change.

## Live Demo

Deployed on Vercel: (https://cinestream-next-sprint10.vercel.app/)

## API

This project uses the TMDB API - https://www.themoviedb.org/documentation/api
