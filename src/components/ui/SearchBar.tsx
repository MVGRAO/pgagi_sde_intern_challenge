"use client";
import { useState } from 'react';
import useDebounce from '@/hooks/userDebounce';

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="px-3 py-2 rounded border w-64"
    />
  );
}
