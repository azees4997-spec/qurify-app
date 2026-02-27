"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useCart } from "./context/CartContext";
import Link from "next/link";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const { data, error } = await supabase
      .from("medicine_switch")
      .select("*");

    if (error) {
      console.log(error);
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

      {/* SEARCH */}
      <div className="search-bar">
        <input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* FLOATING CART */}
      <Link href="/cart">
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#F97316",
            color: "white",
            padding: "15px 20px",
            borderRadius: "50px",
            fontWeight: "600",
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            cursor: "pointer",
            zIndex: 999,
          }}
        >
          🛒 {cart.length}
        </div>
      </Link>

      {loading && <p>Loading medicines...</p>}

      {!loading && filtered.length === 0 && (
        <p>No medicines found.</p>
      )}

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
          med.branded_price - med.generic_price;

        return (
          <div
            key={med.id}
            className="card comparison"
            style={{ transition: "0.3s ease" }}
          >
            {/* BIG SWITCH BANNER */}
            <div
              style={{
                background: "#FFF7ED",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontWeight: "600",
                color: "#F97316",
              }}
            >
              💰 Switch & Save ₹{switchSave} instantly!
            </div>

            {/* BRANDED */}
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

              {/* PROGRESS BAR */}
              <div
                style={{
                  background: "#e5e7eb",
                  height: "8px",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    width: `${brandedSave}%`,
                    height: "100%",
                    background: "#1E3A8A",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>

              {/* Quantity + Add */}
              <div style={{ marginTop: "15px" }}>
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
            </div>

            {/* GENERIC */}
            <div className="product highlight">
              {/* Recommended Badge */}
              <div
                style={{
                  background: "#F97316",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  display: "inline-block",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                ⭐ Recommended
              </div>

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

              {/* Progress Bar */}
              <div
                style={{
                  background: "#e5e7eb",
                  height: "8px",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    width: `${genericSave}%`,
                    height: "100%",
                    background: "#F97316",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>

              <div style={{ marginTop: "15px" }}>
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
          </div>
        );
      })}
    </div>
  );
}
