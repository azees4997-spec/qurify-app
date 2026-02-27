"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const router = useRouter();

  // Animated Savings Counter
  useEffect(() => {
    let start = 0;
    const end = 70;
    const duration = 1500;
    const incrementTime = 20;
    const step = end / (duration / incrementTime);

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(counter);
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      router.push(`/catalogue?search=${search}`);
    } else {
      router.push("/catalogue");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fff" }}>

      {/* HERO SECTION */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Glow */}
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            background: "#F97316",
            borderRadius: "50%",
            filter: "blur(120px)",
            top: -50,
            left: -50,
            animation: "pulse 6s infinite",
          }}
        />

        <h1 style={{ fontSize: 48, marginBottom: 20 }}>
          Save Up To{" "}
          <span style={{ color: "#F97316" }}>
            {count}%
          </span>{" "}
          On Medicines
        </h1>

        <p style={{ fontSize: 20, marginBottom: 40 }}>
          Genuine • Certified • Affordable
        </p>

        {/* Sticky Search Bar */}
        <div
          style={{
            maxWidth: 600,
            margin: "auto",
            display: "flex",
            gap: 10,
          }}
        >
          <input
            placeholder="Search medicine or composition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: 16,
              borderRadius: 12,
              border: "none",
              fontSize: 16,
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "16px 25px",
              background: "#F97316",
              border: "none",
              borderRadius: 12,
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* BEFORE vs AFTER SECTION */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 32, color: "#1E3A8A", marginBottom: 50 }}>
          Same Composition. Massive Savings.
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              border: "1px solid #eee",
              padding: 30,
              borderRadius: 15,
              width: 250,
            }}
          >
            <h3>Dolo 650</h3>
            <p style={{ textDecoration: "line-through", color: "gray" }}>
              ₹35
            </p>
            <p style={{ fontSize: 22 }}>₹30</p>
          </div>

          <div
            style={{
              border: "2px solid #F97316",
              background: "#FFF7ED",
              padding: 30,
              borderRadius: 15,
              width: 250,
            }}
          >
            <h3>Paracip 650 ⭐</h3>
            <p style={{ textDecoration: "line-through", color: "gray" }}>
              ₹35
            </p>
            <p style={{ fontSize: 22, color: "#F97316" }}>₹10</p>
            <p style={{ color: "green", fontWeight: "bold" }}>
              Save ₹20
            </p>
          </div>
        </div>
      </section>

      {/* DOCTOR TRUST BADGE */}
      <section
        style={{
          background: "#F8FAFC",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Trusted by Doctors</h2>
        <p style={{ maxWidth: 600, margin: "auto" }}>
          All medicines are sourced from WHO-GMP certified manufacturers and verified by licensed pharmacists.
        </p>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ marginBottom: 40 }}>What Customers Say</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 250 }}>
            ⭐⭐⭐⭐⭐  
            <p>"Saved thousands on monthly medicines!"</p>
          </div>
          <div style={{ maxWidth: 250 }}>
            ⭐⭐⭐⭐⭐  
            <p>"Same quality, much lower price."</p>
          </div>
          <div style={{ maxWidth: 250 }}>
            ⭐⭐⭐⭐⭐  
            <p>"Fast delivery & genuine medicines."</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        style={{
          background: "#F8FAFC",
          padding: "60px 20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          Frequently Asked Questions
        </h2>

        <div style={{ maxWidth: 700, margin: "auto" }}>
          <p><strong>Are generic medicines safe?</strong></p>
          <p>Yes. They contain the same active ingredients as branded medicines.</p>

          <p><strong>Why are they cheaper?</strong></p>
          <p>No heavy marketing costs — same quality at lower price.</p>

          <p><strong>Do I need prescription?</strong></p>
          <p>Prescription medicines require valid doctor prescription.</p>
        </div>
      </section>

    </div>
  );
}
