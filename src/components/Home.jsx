import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/mylogo.png";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e3f2fd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
          borderRadius: "2rem",
          padding: "2.5rem 2.5rem 2rem 2.5rem",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          border: "1px solid #b2dfdb",
        }}
      >
        <img
          src={logo}
          alt="VitaHub Logo"
          style={{
            width: "70px",
            height: "70px",
            objectFit: "contain",
            marginBottom: "1.2rem",
            borderRadius: "50%",
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
            animation: "spin 3s linear infinite"
          }}
        />
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "#1976d2",
            marginBottom: "0.5rem",
            letterSpacing: "1px"
          }}
        >
          VitaHub
        </h1>
        <p style={{ color: "#1976d2", marginBottom: "2rem", fontWeight: 500 }}>
          Your one-stop hub for health and wellness.
        </p>
        <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center" }}>
          <button
            style={{
              background: "#1976d2",
              color: "#fff",
              padding: "0.9rem 1.6rem",
              borderRadius: "1.5rem",
              fontWeight: 700,
              fontSize: "1.1rem",
              border: "none",
              boxShadow: "0 2px 8px 0 rgba(25,118,210,0.10)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => navigate("/blood-donation")}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.07)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Blood Donation
          </button>
          <button
            style={{
              background: "#388e3c",
              color: "#fff",
              padding: "0.9rem 1.6rem",
              borderRadius: "1.5rem",
              fontWeight: 700,
              fontSize: "1.1rem",
              border: "none",
              boxShadow: "0 2px 8px 0 rgba(56,142,60,0.10)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => navigate("/medicine-delivery")}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.07)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Medicine Delivery
          </button>
        </div>
      </div>
      {/* Keyframes for logo spin */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
