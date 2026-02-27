"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    branded_name: "",
    branded_company: "",
    generic_name: "",
    generic_company: "",
    composition: "",
    branded_mrp: "",
    branded_price: "",
    generic_mrp: "",
    generic_price: "",
    image_url: ""
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const { data } = await supabase
      .from("medicine_switch")
      .select("*");

    setMedicines(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.from("medicine_switch").insert([form]);

    setForm({
      branded_name: "",
      branded_company: "",
      generic_name: "",
      generic_company: "",
      composition: "",
      branded_mrp: "",
      branded_price: "",
      generic_mrp: "",
      generic_price: "",
      image_url: ""
    });

    fetchMedicines();
  };

  const deleteMedicine = async (id) => {
    await supabase
      .from("medicine_switch")
      .delete()
      .eq("id", id);

    fetchMedicines();
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            style={{
              display: "block",
              marginBottom: 10,
              padding: 10,
              width: "100%"
            }}
          />
        ))}

        <button type="submit" className="generic-btn">
          Add Medicine
        </button>
      </form>

      <h2>Existing Medicines</h2>

      {medicines.map((med) => (
        <div key={med.id} className="card">
          {med.branded_name}
          <button
            style={{ marginLeft: 10 }}
            onClick={() => deleteMedicine(med.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
