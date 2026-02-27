"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Catalogue() {
  const params = useSearchParams();
  const query = params.get("search") || "";
  const [data, setData] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("medicine_switch")
        .select("*")
        .or(`branded_name.ilike.%${query}%,generic_name.ilike.%${query}%,composition.ilike.%${query}%`);

      setData(data || []);
    };
    fetch();
  }, [query]);

  return (
    <div className="catalogue">
      {data.map((item) => {
        const save = item.branded_price - item.generic_price;
        const percent = Math.round((save / item.branded_price) * 100);

        return (
          <div key={item.id} className="compare-card">
            <div className="brand">
              <h3>{item.branded_name}</h3>
              <p>₹{item.branded_price}</p>
            </div>

            <div className="generic">
              <div className="badge">Recommended</div>
              <h3>{item.generic_name}</h3>
              <p className="orange">₹{item.generic_price}</p>

              <div className="bar">
                <div className="fill" style={{ width: `${percent}%` }} />
              </div>

              <p className="green">Save ₹{save} ({percent}%)</p>

              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}

      <Link href="/cart" className="floating-cart">🛒</Link>
    </div>
  );
}
