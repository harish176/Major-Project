import React from "react";

const Facilities = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        Our Facilities
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>Library</h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            A comprehensive library with over 50,000 books, digital resources,
            research databases, and quiet study areas for students.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
            Computer Labs
          </h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            State-of-the-art computer laboratories equipped with latest hardware
            and software for programming and research.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
            Sports Complex
          </h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Multi-purpose sports facilities including basketball court, tennis
            court, gym, and outdoor playing fields.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>Cafeteria</h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Spacious dining area serving nutritious meals, snacks, and beverages
            with various dietary options available.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>Auditorium</h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Modern auditorium with seating capacity of 500, equipped with
            advanced audio-visual systems for events and seminars.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
            Wi-Fi Campus
          </h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            High-speed wireless internet connectivity available throughout the
            campus for seamless online learning and research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
