"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const { data } = await supabase.from("medicines").select("*");
    if (data) setMedicines(data);
  };

  const filtered = medicines.filter((med) =>
    med.branded_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Save up to 70% on Your Medicines</h1>

      <input
        placeholder="Search medicine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          width: 300,
          marginBottom: 20
        }}
      />

      {filtered.map((med) => (
        <div
          key={med.id}
          style={{
            border: "1px solid #ddd",
            padding: 20,
            marginBottom: 15,
            borderRadius: 8
          }}
        >
          <h3>{med.branded_name}</h3>
          <p><b>Composition:</b> {med.composition}</p>
          <p>Branded Price: ₹{med.branded_price}</p>
          <p>Generic Price: ₹{med.generic_price}</p>
        </div>
      ))}
    </div>
  );
}
