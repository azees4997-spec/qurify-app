"use client";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetch = async () => {
      const { data } = await supabase
        .from("medicine_switch")
        .select("branded_name,generic_name,composition")
        .or(`branded_name.ilike.%${search}%,generic_name.ilike.%${search}%,composition.ilike.%${search}%`)
        .limit(5);

      setSuggestions(data || []);
    };

    fetch();
  }, [search]);

  return (
    <div className="hero">
      <h1>Save up to <span>70%</span> on Medicines</h1>
      <p>Same composition. Same quality. Lower price.</p>

      <div className="search-box">
        <input
          placeholder="Search medicine or salt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => router.push(`/catalogue?search=${search}`)}>
          Search
        </button>

        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => router.push(`/catalogue?search=${s.branded_name}`)}
              >
                {s.branded_name} / {s.generic_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
