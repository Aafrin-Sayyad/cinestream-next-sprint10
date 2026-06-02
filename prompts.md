# AI Usage Log - Sprint 10

This file documents how I used AI assistance during this sprint.
I used AI only for clearing doubts, not for writing code directly.

---

## Doubt 1 - Redux Provider placement

**My question:**
I kept getting this error: "could not find react-redux context value". I didn't understand where exactly to put the Provider component in Next.js since layout.jsx is a server component.

**What I understood from the answer:**
The Provider needs to be in a separate client component because Next.js server components can't run client-side code. So I had to make a ReduxProvider.jsx with "use client" at the top and then import that inside layout.jsx.

**Code I wrote myself after understanding:**
```jsx
// ReduxProvider.jsx
"use client"
import { Provider } from "react-redux"
import store from "@/store/store"

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}
```

---

## Doubt 2 - createSlice vs createReducer

**My question:**
What is the difference between createSlice and createReducer in Redux Toolkit? Which one should I use?

**What I understood from the answer:**
createSlice is the modern way and it automatically creates action creators for you. createReducer is more manual. For a student project createSlice is much easier and is the recommended approach.

---

## Doubt 3 - useSelector re-renders

**My question:**
I noticed my whole app was re-rendering every time I clicked a filter. Is that normal? How do I fix it?

**What I understood from the answer:**
useSelector only re-renders the component that subscribed to that specific slice of state. If I select only filters, it won't re-render when favorites change. I also learned about useMemo to avoid re-running expensive filter operations on every render.

---

## Doubt 4 - useMemo syntax

**My question:**
I was confused about when exactly useMemo re-runs. What goes in the dependency array?

**What I understood from the answer:**
useMemo re-runs when any value in the dependency array changes. So if I put [movies, filters] it will only recalculate filteredMovies when either movies or filters changes, not when theme changes or favorites changes.

---

## Doubt 5 - Server component vs Client component in Next.js

**My question:**
My FilterSidebar was giving an error saying hooks can't be used in server components. But I never added "use client" to my page.jsx.

**What I understood from the answer:**
In Next.js 13+ all components are server components by default. Any component that uses useState, useEffect, useSelector or any hook needs "use client" at the very top of the file. page.jsx can stay as server component and just import the client components.

---

## Doubt 6 - Git pushing node_modules

**My question:**
My git push was failing because of a 141MB file in node_modules. My .gitignore had node_modules in it but it still got pushed.

**What I understood from the answer:**
If node_modules gets committed before .gitignore is set up properly, git still tracks it even after you add it to .gitignore. You have to run git rm -r --cached node_modules to untack it first, then commit again.

---

## Total AI usage summary

| Type | Count |
|------|-------|
| Concept doubts | 4 |
| Error debugging help | 2 |
| Code written by AI | 0 |


