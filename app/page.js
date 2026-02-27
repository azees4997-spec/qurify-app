"use client";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchData = async () => {
      const { data } = await supabase
        .from("medicine_switch")
        .select("branded_name,generic_name")
        .or(
          `branded_name.ilike.%${search}%,generic_name.ilike.%${search}%`
        )
        .limit(5);

      setSuggestions(data || []);
    };

    fetchData();
  }, [search]);

  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>
          Save up to <span>70%</span> on Medicines
        </h1>
        <p>
          Same composition. Same quality. Lower price.
        </p>

        <div className="search-box">
          <input
            placeholder="Search medicine or salt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() =>
              router.push(`/catalogue?search=${search}`)
            }
          >
            Search
          </button>

          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() =>
                    router.push(
                      `/catalogue?search=${item.branded_name}`
                    )
                  }
                >
                  {item.branded_name} / {item.generic_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SAVINGS VISUAL */}
      <section className="info-section">
        <h2>Why Pay More for Same Medicine?</h2>
        <div className="comparison-visual">
          <div className="branded-box">
            <h3>Branded</h3>
            <p className="big-price">₹35</p>
          </div>

          <div className="generic-box">
            <h3>Generic</h3>
            <p className="big-price highlight">₹10</p>
            <p className="save-label">
              You Save 67%
            </p>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="trust-section">
        <h2>Trusted & Certified</h2>
        <div className="trust-grid">
          <div>✔ WHO GMP Certified</div>
          <div>✔ Licensed Pharmacies</div>
          <div>✔ Doctor Recommended</div>
          <div>✔ 100% Genuine Medicines</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section">
        <h2>What Customers Say</h2>
        <div className="testimonial-grid">
          <div>
            ⭐⭐⭐⭐⭐  
            <p>
              “Saved thousands every month.”
            </p>
          </div>
          <div>
            ⭐⭐⭐⭐⭐  
            <p>
              “Best alternative to branded medicines.”
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>Are generics safe?</strong>
          <p>
            Yes. They contain the same active ingredient
            as branded medicines.
          </p>
        </div>

        <div className="faq-item">
          <strong>Why cheaper?</strong>
          <p>
            Generics don’t spend on heavy marketing.
          </p>
        </div>

        <div className="faq-item">
          <strong>Do I need prescription?</strong>
          <p>
            Yes, for prescription medicines.
          </p>
        </div>
      </section>

    </div>
  );
}
