"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim() !== "") {
      router.push(`/catalogue?search=${search}`);
    } else {
      router.push("/catalogue");
    }
  };

  return (
    <div style={{ background: "#ffffff" }}>
      
      {/* HERO SECTION */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "linear-gradient(to right, #1E3A8A, #2563eb)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: 42, marginBottom: 20 }}>
          Save Up To <span style={{ color: "#F97316" }}>70%</span> on Medicines
        </h1>

        <p style={{ fontSize: 18, marginBottom: 30 }}>
          Genuine • Trusted • WHO-GMP Certified Generics
        </p>

        {/* SEARCH BAR */}
        <div
          style={{
            maxWidth: 600,
            margin: "auto",
            display: "flex",
            gap: 10,
          }}
        >
          <input
            placeholder="Search medicine name or composition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              border: "none",
              fontSize: 16,
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              padding: "15px 25px",
              background: "#F97316",
              border: "none",
              borderRadius: 10,
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* WHY SWITCH SECTION */}
      <section
        style={{
          padding: "70px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 30, marginBottom: 40, color: "#1E3A8A" }}>
          Why Switch to Generics?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 250 }}>
            <h3 style={{ color: "#F97316" }}>💰 Save More</h3>
            <p>Pay less for the same composition & quality.</p>
          </div>

          <div style={{ maxWidth: 250 }}>
            <h3 style={{ color: "#F97316" }}>🏭 Certified</h3>
            <p>Manufactured in WHO-GMP approved facilities.</p>
          </div>

          <div style={{ maxWidth: 250 }}>
            <h3 style={{ color: "#F97316" }}>⚡ Fast Delivery</h3>
            <p>Quick and reliable doorstep delivery.</p>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section
        style={{
          background: "#FFF7ED",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>
          Trusted by Thousands
        </h2>

        <p style={{ maxWidth: 600, margin: "auto" }}>
          We ensure quality checks, licensed pharmacists,
          and secure packaging for every order.
        </p>

        <button
          onClick={() => router.push("/catalogue")}
          style={{
            marginTop: 30,
            padding: "15px 30px",
            background: "#F97316",
            border: "none",
            borderRadius: 10,
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Browse Medicines
        </button>
      </section>

    </div>
  );
}
