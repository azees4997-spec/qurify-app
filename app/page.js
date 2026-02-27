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
      <h1>Save More with Generic Medicines</h1>

      {/* SEARCH */}
      <div className="search-bar">
        <input
          placeholder="Search by brand or composition..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* ADD TO CART POPUP */}
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
            zIndex: 999,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
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
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 999
          }}
        >
          🛒 {cart.length}
        </div>
      </Link>

      {loading && <p>Loading medicines...</p>}

      {!loading && filtered.length === 0 && (
        <p>No medicines found.</p>
      )}

      {/* PRODUCT CARDS */}
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
            className="card"
            style={{ marginBottom: 50 }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                flexWrap: "wrap"
              }}
            >
              <h2 style={{ color: "#1E3A8A" }}>
                {med.composition}
              </h2>

              <div
                style={{
                  background: "#F97316",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 30,
                  fontWeight: 600,
                }}
              >
                💰 Switch & Save ₹{switchSave}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 30,
                flexWrap: "wrap"
              }}
            >
              {/* BRANDED */}
              <div
                style={{
                  flex: 1,
                  border: "1px solid #eee",
                  padding: 20,
                  borderRadius: 12,
                  minWidth: 280
                }}
              >
                <img
                  src={
                    med.image_url ||
                    "https://via.placeholder.com/120"
                  }
                  alt="medicine"
                  style={{
                    width: 120,
                    borderRadius: 10,
                    marginBottom: 15
                  }}
                />

                <h3>{med.branded_name}</h3>
                <p style={{ color: "#6b7280" }}>
                  {med.branded_company}
                </p>

                <p style={{ fontWeight: 600 }}>
                  ₹{med.branded_price}
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: 10,
                      color: "#9ca3af"
                    }}
                  >
                    ₹{med.branded_mrp}
                  </span>
                </p>

                <p style={{ color: "#16a34a" }}>
                  Save {brandedSave.toFixed(0)}%
                </p>

                <button
                  className="add-btn branded-btn"
                  onClick={() =>
                    addToCart({
                      name: med.branded_name,
                      price: med.branded_price,
                    })
                  }
                >
                  Buy Branded
                </button>
              </div>

              {/* GENERIC */}
              <div
                style={{
                  flex: 1,
                  background: "#FFF7ED",
                  padding: 20,
                  borderRadius: 12,
                  border: "2px solid #F97316",
                  minWidth: 280
                }}
              >
                <div
                  style={{
                    background: "#F97316",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    display: "inline-block",
                    marginBottom: 10
                  }}
                >
                  ⭐ Recommended
                </div>

                <img
                  src={
                    med.image_url ||
                    "https://via.placeholder.com/120"
                  }
                  alt="medicine"
                  style={{
                    width: 120,
                    borderRadius: 10,
                    marginBottom: 15
                  }}
                />

                <h3>{med.generic_name}</h3>
                <p style={{ color: "#6b7280" }}>
                  {med.generic_company}
                </p>

                <p style={{ fontWeight: 600 }}>
                  ₹{med.generic_price}
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginLeft: 10,
                      color: "#9ca3af"
                    }}
                  >
                    ₹{med.generic_mrp}
                  </span>
                </p>

                <p style={{ color: "#16a34a" }}>
                  Save {genericSave.toFixed(0)}% + Extra ₹{switchSave}
                </p>

                <button
                  className="add-btn generic-btn"
                  onClick={() =>
                    addToCart({
                      name: med.generic_name,
                      price: med.generic_price,
                    })
                  }
                >
                  Switch & Save
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
