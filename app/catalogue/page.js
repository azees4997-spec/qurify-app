"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// 🔹 Replace with your real values
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Catalogue() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, [query]);

  async function fetchMedicines() {
    setLoading(true);

    let request = supabase
      .from("medicine_switch")
      .select("*");

    if (query) {
      request = request.or(
        `branded_name.ilike.%${query}%,generic_name.ilike.%${query}%,composition.ilike.%${query}%`
      );
    }

    const { data, error } = await request.limit(50);

    if (error) {
      console.error(error);
    } else {
      setMedicines(data);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 30, background: "#F8FAFC", minHeight: "100vh" }}>
      
      <h1 style={{ textAlign: "center", color: "#1E3A8A", marginBottom: 40 }}>
        Compare & Switch to Save
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading medicines...</p>
      ) : medicines.length === 0 ? (
        <p style={{ textAlign: "center" }}>No medicines found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 25,
          }}
        >
          {medicines.map((med) => {
            const brandedSave =
              med.branded_mrp - med.branded_price;

            const genericSave =
              med.branded_price - med.generic_price;

            const genericSavePercent = Math.round(
              (genericSave / med.branded_price) * 100
            );

            return (
              <div
                key={med.id}
                style={{
                  background: "white",
                  padding: 25,
                  borderRadius: 16,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  transition: "0.3s",
                }}
              >
                {/* Branded */}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ color: "#1E3A8A" }}>
                    {med.branded_name}
                  </h3>
                  <p style={{ fontSize: 14, color: "gray" }}>
                    {med.branded_company}
                  </p>

                  <p>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                      }}
                    >
                      ₹{med.branded_mrp}
                    </span>{" "}
                    <span style={{ fontWeight: "bold" }}>
                      ₹{med.branded_price}
                    </span>
                  </p>

                  <p style={{ color: "red", fontSize: 14 }}>
                    Save ₹{brandedSave}
                  </p>
                </div>

                <hr />

                {/* Generic */}
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ color: "#F97316" }}>
                      {med.generic_name}
                    </h3>

                    <span
                      style={{
                        background: "#F97316",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    >
                      Recommended
                    </span>
                  </div>

                  <p style={{ fontSize: 14, color: "gray" }}>
                    {med.generic_company}
                  </p>

                  <p>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                      }}
                    >
                      ₹{med.branded_price}
                    </span>{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#F97316",
                      }}
                    >
                      ₹{med.generic_price}
                    </span>
                  </p>

                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    Save {genericSavePercent}% by switching
                  </p>

                  <button
                    style={{
                      marginTop: 15,
                      width: "100%",
                      padding: 12,
                      background: "#F97316",
                      border: "none",
                      borderRadius: 10,
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Add Generic to Cart
                  </button>
                </div>

                {/* Composition */}
                <p
                  style={{
                    marginTop: 15,
                    fontSize: 13,
                    color: "gray",
                  }}
                >
                  Composition: {med.composition}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
