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
    <div className="catalogue">

      {loading && <p>Loading medicines...</p>}

      {!loading && data.length === 0 && (
        <p>No medicines found</p>
      )}

      {data.map((item) => {
        const save = item.branded_price - item.generic_price;
        const percent = Math.round(
          (save / item.branded_price) * 100
        );

        return (
          <div key={item.id} className="compare-card">

            {/* Branded */}
            <div className="brand">
              <h3>{item.branded_name}</h3>
              <p>{item.branded_company}</p>
              <p>₹{item.branded_price}</p>
            </div>

            {/* Generic */}
            <div className="generic">
              <div className="badge">Recommended</div>

              <h3>{item.generic_name}</h3>
              <p>{item.generic_company}</p>
              <p className="orange">
                ₹{item.generic_price}
              </p>

              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="green">
                Save ₹{save} ({percent}%)
              </p>

              <button
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
