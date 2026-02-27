"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Live Suggestions
  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const { data } = await supabase
        .from("medicine_switch")
        .select("branded_name, generic_name")
        .or(`branded_name.ilike.%${search}%,generic_name.ilike.%${search}%,composition.ilike.%${search}%`)
        .limit(5);

      setSuggestions(data || []);
    };

    fetchSuggestions();
  }, [search]);

  return (
    <div>

      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, #0F172A, #1E3A8A)",
          color: "white",
          padding: "120px 20px",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: 50 }}>
          Save Up To <span style={{ color: "#F97316" }}>70%</span> On Medicines
        </h1>

        <p style={{ fontSize: 20, marginTop: 15 }}>
          Same composition. Same quality. Lower price.
        </p>

        {/* SEARCH */}
        <div style={{ maxWidth: 600, margin: "40px auto", position: "relative" }}>
          <input
            placeholder="Search medicine or salt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: 15,
              borderRadius: 10,
              border: "none"
            }}
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div
              style={{
                background: "white",
                color: "black",
                position: "absolute",
                width: "100%",
                borderRadius: 8,
                marginTop: 5,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                zIndex: 1000
              }}
            >
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => router.push(`/catalogue?search=${search}`)}
                  style={{
                    padding: 10,
                    cursor: "pointer"
                  }}
                >
                  {item.branded_name} / {item.generic_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* INFORMATION SECTION */}
      <div style={{ padding: 80, textAlign: "center" }}>
        <h2 style={{ fontSize: 32 }}>Why Switch to Generics?</h2>

        <div style={{ display: "flex", justifyContent: "center", gap: 50, marginTop: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 250 }}>
            💰 <h3>Save More</h3>
            <p>Reduce monthly medicine expenses drastically.</p>
          </div>
          <div style={{ maxWidth: 250 }}>
            🏭 <h3>Certified</h3>
            <p>WHO-GMP approved manufacturers.</p>
          </div>
          <div style={{ maxWidth: 250 }}>
            👨‍⚕️ <h3>Doctor Trusted</h3>
            <p>Same active ingredients as branded drugs.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
