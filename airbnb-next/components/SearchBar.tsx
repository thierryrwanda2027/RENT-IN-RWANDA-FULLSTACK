"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 border rounded-full p-2 pl-4 shadow-sm hover:shadow-md transition bg-white w-full max-w-md">
      <input
        type="text"
        placeholder="Search destinations"
        className="flex-1 bg-transparent outline-none text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="bg-rose-500 p-2 rounded-full text-white hover:bg-rose-600 transition">
        <FaSearch size={16} />
      </button>
    </form>
  );
}
