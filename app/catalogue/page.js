"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Catalogue({ searchParams }) {
  const query = searchParams?.search || "";

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
      setMedicines(data || []);
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
                }}
              >
                <h3 style={{ color: "#1E3A8A" }}>
                  {med.branded_name}
                </h3>
                <p style={{ color: "gray" }}>
                  {med.branded_company}
                </p>

                <hr style={{ margin: "15px 0" }} />

                <h3 style={{ color: "#F97316" }}>
                  {med.generic_name}
                </h3>
                <p style={{ color: "gray" }}>
                  {med.generic_company}
                </p>

                <p>
                  ₹{med.generic_price}
                </p>

                <p style={{ color: "green", fontWeight: "bold" }}>
                  Save {genericSavePercent}%
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
                  }}
                >
                  Add Generic to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
