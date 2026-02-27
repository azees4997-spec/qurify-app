"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useCart } from "./context/CartContext";
import Link from "next/link";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const { data, error } = await supabase
      .from("medicine_switch")
      .select("*");

    if (error) {
      console.log("Supabase error:", error);
    } else {
      setMedicines(data || []);
    }
    setLoading(false);
  };

  const filtered =
    search.length > 0
      ? medicines.filter(
          (m) =>
            m.branded_name?.toLowerCase().includes(search.toLowerCase()) ||
            m.generic_name?.toLowerCase().includes(search.toLowerCase()) ||
            m.composition?.toLowerCase().includes(search.toLowerCase())
        )
      : medicines;

  return (
    <div className="container">
      <h1>Save up to 70% on Your Medicines</h1>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          placeholder="Search medicine by name or composition..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      <Link href="/cart" className="cart-link">
        🛒 Go to Cart
      </Link>

      {/* LOADING */}
      {loading && <p>Loading medicines...</p>}

      {/* NO RESULTS */}
      {!loading && filtered.length === 0 && (
        <p>No medicines found.</p>
      )}

      {/* PRODUCT LIST */}
      {filtered.map((med) => {
        const brandedSave =
          ((med.branded_mrp - med.branded_price) /
            med.branded_mrp) *
          100;

        const genericSave =
          ((med.generic_mrp - med.generic_price) /
            med.generic_mrp) *
          100;

        const switchSave =
          ((med.branded_price - med.generic_price) /
            med.branded_price) *
          100;

        return (
          <div key={med.id} className="card comparison">
            
            {/* BRANDED SECTION */}
            <div className="product">
              <h3>{med.branded_name}</h3>
              <div className="company">
                {med.branded_company}
              </div>

              <div className="price">
                ₹{med.branded_price}
                <span className="mrp">
                  ₹{med.branded_mrp}
                </span>
              </div>

              <div className="saving">
                You Save {brandedSave.toFixed(0)}%
              </div>

              <button
                className="add-btn branded-btn"
                onClick={() =>
                  addToCart({
                    name: med.branded_name,
                    price: med.branded_price,
                  })
                }
              >
                Add to Cart
              </button>
            </div>

            {/* GENERIC SECTION */}
            <div className="product highlight">
              <h3>
                {med.generic_name} 🔥
              </h3>

              <div className="company">
                {med.generic_company}
              </div>

              <div className="price">
                ₹{med.generic_price}
                <span className="mrp">
                  ₹{med.generic_mrp}
                </span>
              </div>

              <div className="saving">
                Save {genericSave.toFixed(0)}% | 
                Extra {switchSave.toFixed(0)}% vs Branded
              </div>

              <button
                className="add-btn generic-btn"
                onClick={() =>
                  addToCart({
                    name: med.generic_name,
                    price: med.generic_price,
                  })
                }
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
