"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useCart } from "./context/CartContext";
import Link from "next/link";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { cart, addToCart, showPopup } = useCart();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const { data, error } = await supabase
      .from("medicine_switch")
      .select("*");

    if (!error) setMedicines(data || []);
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

      {/* SEARCH */}
      <div className="search-bar">
        <input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* ADD POPUP */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#16a34a",
            color: "white",
            padding: "12px 20px",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          ✅ Item Added to Cart
        </div>
      )}

      {/* FLOATING CART */}
      <Link href="/cart">
        <div
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            background: "#F97316",
            color: "white",
            padding: "15px 20px",
            borderRadius: "50px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          🛒 {cart.length}
        </div>
      </Link>

      {loading && <p>Loading...</p>}

      {!loading &&
        filtered.map((med) => {
          const brandedSave =
            ((med.branded_mrp - med.branded_price) /
              med.branded_mrp) *
            100;

          const genericSave =
            ((med.generic_mrp - med.generic_price) /
              med.generic_mrp) *
            100;

          const switchSave =
            med.branded_price - med.generic_price;

          return (
            <div key={med.id} className="card comparison">
              <div
                style={{
                  background: "#FFF7ED",
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 20,
                  color: "#F97316",
                  fontWeight: 600,
                }}
              >
                💰 Switch & Save ₹{switchSave}
              </div>

              {/* BRANDED */}
              <div className="product">
                <img
                  src="https://via.placeholder.com/120"
                  alt="medicine"
                  style={{ width: 120, borderRadius: 10 }}
                />

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

              {/* GENERIC */}
              <div className="product highlight">
                <div
                  style={{
                    background: "#F97316",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: 12,
                    display: "inline-block",
                    marginBottom: 10,
                  }}
                >
                  ⭐ Recommended
                </div>

                <img
                  src="https://via.placeholder.com/120"
                  alt="medicine"
                  style={{ width: 120, borderRadius: 10 }}
                />

                <h3>{med.generic_name}</h3>
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
                  Save {genericSave.toFixed(0)}% + Extra ₹{switchSave}
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
