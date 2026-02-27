"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);

  // Animated savings counter
  useEffect(() => {
    let start = 0;
    const end = 70;
    const duration = 1500;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCounter(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      router.push(`/catalogue?search=${search}`);
    } else {
      router.push("/catalogue");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#ffffff" }}>
      
      {/* NAVBAR */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "#ffffff",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}
      >
        <h2 style={{ color: "#1E3A8A" }}>Qurify</h2>

        <div style={{ display: "flex", gap: 20 }}>
          <button
            onClick={() => router.push("/catalogue")}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Medicines
          </button>

          <button
            style={{
              background: "#F97316",
              color: "white",
              padding: "8px 15px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => router.push("/cart")}
          >
            Cart
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
          color: "white"
        }}
      >
        <h1 style={{ fontSize: 46, marginBottom: 20 }}>
          Save Up To{" "}
          <span style={{ color: "#F97316" }}>
            {counter}%
          </span>{" "}
          On Medicines
        </h1>

        <p style={{ fontSize: 20, marginBottom: 40 }}>
          Genuine • Certified • Affordable Healthcare
        </p>

        <div
          style={{
            maxWidth: 600,
            margin: "auto",
            display: "flex",
            gap: 10
          }}
        >
          <input
            placeholder="Search medicine name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              border: "none",
              fontSize: 16
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
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* BEFORE VS AFTER */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ marginBottom: 50, color: "#1E3A8A" }}>
          Same Composition. Massive Savings.
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              border: "1px solid #eee",
              padding: 30,
              borderRadius: 15,
              width: 250
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
              padding: 30,
              borderRadius: 15,
              width: 250,
              background: "#FFF7ED"
            }}
          >
            <h3 style={{ color: "#F97316" }}>Paracip 650 ⭐</h3>
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

      {/* TRUST SECTION */}
      <section
        style={{
          background: "#F8FAFC",
          padding: "70px 20px",
          textAlign: "center"
        }}
      >
        <h2>Trusted by Doctors</h2>
        <p style={{ maxWidth: 600, margin: "20px auto" }}>
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
            flexWrap: "wrap"
          }}
        >
          <div style={{ maxWidth: 250 }}>
            ⭐⭐⭐⭐⭐
            <p>"Saved thousands every month!"</p>
          </div>
          <div style={{ maxWidth: 250 }}>
            ⭐⭐⭐⭐⭐
            <p>"Fast delivery & genuine medicines."</p>
          </div>
          <div style={{ maxWidth: 250 }}>
            ⭐⭐⭐⭐⭐
            <p>"Best alternative to branded drugs."</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          background: "#F8FAFC",
          padding: "60px 20px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          Frequently Asked Questions
        </h2>

        <div style={{ maxWidth: 700, margin: "auto" }}>
          <p><strong>Are generic medicines safe?</strong></p>
          <p>Yes. They contain the same active ingredients as branded medicines.</p>

          <p><strong>Why cheaper?</strong></p>
          <p>No heavy marketing cost — same quality at lower price.</p>

          <p><strong>Need prescription?</strong></p>
          <p>Prescription medicines require valid prescription.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#1E3A8A",
          color: "white",
          padding: 30,
          textAlign: "center"
        }}
      >
        © {new Date().getFullYear()} Qurify. All rights reserved.
      </footer>
    </div>
  );
}
