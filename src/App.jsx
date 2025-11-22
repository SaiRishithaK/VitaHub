// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Home removed per user request; default route will redirect to blood donation
import BloodDonation from "./modules/blood-donation/BloodDonation";
import MedicineDelivery from "./components/MedicineDelivery";
import "./App.css";


function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2vw',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1200,
        minHeight: 600,
        background: 'rgba(255,255,255,0.85)',
        borderRadius: '2rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        padding: '2.5rem 2vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/blood-donation" replace />} />
            <Route path="/blood-donation" element={<BloodDonation />} />
            <Route path="/medicine-delivery" element={<MedicineDelivery />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
