// src/contexts/SearchContext.jsx
import React, { createContext, useContext, useRef, useState, useCallback } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);

  // utility to focus input (safe with setTimeout to avoid timing issues)
  const focusInput = useCallback(() => {
    setTimeout(() => {
      try { inputRef.current?.focus(); } catch(err) {
        console.log(err);
      }
    }, 0);
  }, []);

  return (
    <SearchContext.Provider
      value={{ query, setQuery, searching, setSearching, inputRef, focusInput }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
};
