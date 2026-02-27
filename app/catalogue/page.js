"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

export default function Catalogue({ searchParams }) {
  const query = searchParams?.search || "";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchData();
  }, [query]);

  async function fetchData() {
    setLoading(true);

    let request = supabase
      .from("medicine_switch")
      .select("*");

    if (query) {
      request = request.or(
        `branded_name.ilike.%${query}%,generic_name.ilike.%${query}%,composition.ilike.%${query}%`
      );
    }

    const { data } = await request;
    setData(data || []);
    setLoading(false);
  }

  return (
    <div className="catalogue-wrapper">

      {loading && <p>Loading medicines...</p>}

      {!loading && data.length === 0 && (
        <p>No medicines found</p>
      )}

      {data.map((item) => {
        const saveAmount = item.branded_price - item.generic_price;
        const savePercent = Math.round(
          (saveAmount / item.branded_price) * 100
        );

        return (
          <div key={item.id} className="comparison-card">

            {/* LEFT - BRANDED (Visually Weak) */}
            <div className="branded-side">
              <h3>{item.branded_name}</h3>
              <p className="company">{item.branded_company}</p>

              <p className="mrp">
                MRP ₹{item.branded_mrp}
              </p>

              <p className="price">
                ₹{item.branded_price}
              </p>

              <p className="composition">
                {item.composition}
              </p>
            </div>

            {/* RIGHT - GENERIC (Dominant) */}
            <div className="generic-side">

              <div className="recommended-badge">
                SMART CHOICE
              </div>

              <h2>{item.generic_name}</h2>
              <p className="company">{item.generic_company}</p>

              <p className="mrp strike">
                MRP ₹{item.branded_price}
              </p>

              <p className="price highlight">
                ₹{item.generic_price}
              </p>

              <div className="saving-box">
                🔥 Save ₹{saveAmount} ({savePercent}%)
              </div>

              <button
                className="switch-btn"
                onClick={() => addToCart(item)}
              >
                Switch & Save ₹{saveAmount}
              </button>

              <p className="composition">
                Same composition: {item.composition}
              </p>
            </div>

          </div>
        );
      })}
    </div>
  );
}
