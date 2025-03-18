"use client";

import { useState } from "react";

export default function ScopusSearch() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"articles" | "author" | "affiliation">(
    "articles"
  );
  const [results, setResults] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchScopus = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/scopus?query=${query}&type=${type}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data["search-results"]?.entry || []);
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Scopus Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query..."
        className="border p-2 w-full rounded mb-2"
      />
      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value as "articles" | "author" | "affiliation")
        }
        className="border p-2 rounded w-full mb-2"
      >
        <option value="articles">Articles</option>
        <option value="author">Authors</option>
        <option value="affiliation">Affiliations</option>
      </select>
      <button
        onClick={searchScopus}
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        Search
      </button>

      {loading && <p className="mt-2">Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {results ? <h2 className="text-lg font-bold my-2">Show Dc:title</h2> : ""}
      <ul className="mt-4">
        {results.map((item, index) => (
          <li key={index} className="border p-2 rounded my-2">
            {item["dc:title"] ||
              item["affilname"] ||
              item["preferred-name"]?.["surname"] ||
              "No title"}
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold my-2">Show Full JSON</h2>
      {JSON.stringify(results)}
    </div>
  );
}
