"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim() !== "") {
      router.push(`/catalogue?search=${search}`);
    }
  };

  return (
    <div>

      {/* HERO SECTION */}
      <section style={heroStyle}>
        <h1>
          Save up to <span style={{ color: "#FF6B00" }}>70%</span> on Medicines
        </h1>

        <p>Same Composition. Massive Savings. Trusted Quality.</p>

        <div style={searchBox}>
          <input
            placeholder="Search by medicine name or salt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />
          <button onClick={handleSearch} style={searchBtn}>
            Search
          </button>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section style={sectionLight}>
        <h2>Branded vs Generic</h2>

        <div style={compareContainer}>
          <div style={card}>
            <h3>Dolo 650</h3>
            <p>₹30</p>
          </div>

          <div style={{ ...card, border: "2px solid #FF6B00" }}>
            <h3>Paracip 650</h3>
            <p style={{ color: "#FF6B00" }}>₹10</p>
            <strong>Save ₹20</strong>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={sectionWhite}>
        <h2>Trusted by Doctors</h2>
        <p>All medicines sourced from licensed manufacturers.</p>
      </section>

      {/* TESTIMONIALS */}
      <section style={sectionLight}>
        <h2>What Customers Say</h2>
        <p>⭐️⭐️⭐️⭐️⭐️ Saved thousands every month!</p>
        <p>⭐️⭐️⭐️⭐️⭐️ Best alternative to branded medicines.</p>
      </section>

      {/* FAQ */}
      <section style={sectionWhite}>
        <h2>Frequently Asked Questions</h2>
        <p><strong>Are generics safe?</strong> Yes, same composition.</p>
        <p><strong>Why cheaper?</strong> No heavy marketing cost.</p>
      </section>

    </div>
  );
}

const heroStyle = {
  background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
  color: "white",
  padding: "120px 20px",
  textAlign: "center",
};

const searchBox = {
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
};

const searchInput = {
  padding: "12px",
  width: "300px",
  borderRadius: "6px 0 0 6px",
  border: "none",
};

const searchBtn = {
  padding: "12px 20px",
  background: "#FF6B00",
  color: "white",
  border: "none",
  borderRadius: "0 6px 6px 0",
  cursor: "pointer",
};

const sectionLight = {
  padding: "80px 20px",
  textAlign: "center",
  background: "#F8FAFC",
};

const sectionWhite = {
  padding: "80px 20px",
  textAlign: "center",
  background: "white",
};

const compareContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  marginTop: "40px",
};

const card = {
  padding: "30px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
  width: "200px",
};
