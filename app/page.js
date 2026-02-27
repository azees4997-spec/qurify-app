"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useCart } from "./context/CartContext";
import Link from "next/link";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
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
      setMedicines(data);
    }
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

      <div className="search-bar">
        <input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      <Link href="/cart" className="cart-link">
        Go to Cart
      </Link>

      {filtered.map((med) => (
        <div key={med.id} className="card comparison">
          <div className="product">
            <h3>{med.branded_name}</h3>
            <p>Company: {med.branded_company}</p>
            <p>MRP: ₹{med.branded_mrp}</p>
            <p>Price: ₹{med.branded_price}</p>
            <p>Composition: {med.composition}</p>
            <button
              onClick={() =>
                addToCart({
                  name: med.branded_name,
                  price: med.branded_price,
                })
              }
            >
              Add Branded
            </button>
          </div>

          <div className="product highlight">
            <h3>{med.generic_name}</h3>
            <p>Company: {med.generic_company}</p>
            <p>MRP: ₹{med.generic_mrp}</p>
            <p>Price: ₹{med.generic_price}</p>
            <p>Composition: {med.composition}</p>
            <button
              onClick={() =>
                addToCart({
                  name: med.generic_name,
                  price: med.generic_price,
                })
              }
            >
              Add Generic
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
