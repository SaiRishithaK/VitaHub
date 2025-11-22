import React, { useState } from "react";

// Example medicine data (50 medicines, 5 pharmacies each)
const PHARMACIES = [
  // Each entry includes a `key` used by the local resolver server and
  // a `searchTemplate` fallback used if the resolver is not available.
  { key: 'apollo', name: "Apollo", link: "https://www.apollopharmacy.in/", searchTemplate: "https://www.apollopharmacy.in/search?keyword={q}" },
  { key: 'medplus', name: "MedPlus", link: "https://www.medplusmart.com/", searchTemplate: "https://www.medplusmart.com/search?name={q}" },
  { key: 'netmeds', name: "NetMeds", link: "https://www.netmeds.com/", searchTemplate: "https://www.netmeds.com/catalogsearch/result?q={q}" },
  { key: '1mg', name: "1mg", link: "https://www.1mg.com/", searchTemplate: "https://www.1mg.com/search/all?name={q}" },
  { key: 'pharmeasy', name: "PharmEasy", link: "https://pharmeasy.in/", searchTemplate: "https://pharmeasy.in/search/all?search={q}" },
];

function buildPharmacyLink(pharmacy, medicineName) {
  const q = encodeURIComponent(medicineName);
  if (pharmacy && pharmacy.searchTemplate) {
    return pharmacy.searchTemplate.replace('{q}', q);
  }
  // Fallback to a site-scoped Google search which usually finds the product page
  if (pharmacy && pharmacy.link) {
    const host = new URL(pharmacy.link).hostname;
    return `https://www.google.com/search?q=site:${host}+${q}`;
  }
  return '#';
}

const MEDICINE_NAMES = [
  "Paracetamol 500mg", "Dolo 650mg", "Cetrizine 10mg", "Amoxicillin 250mg", "Azithromycin 500mg",
  "Ibuprofen 400mg", "Metformin 500mg", "Aspirin 75mg", "Atorvastatin 10mg", "Pantoprazole 40mg",
  "Cetirizine 5mg", "Levocetirizine 5mg", "Montelukast 10mg", "Losartan 50mg", "Amlodipine 5mg",
  "Telmisartan 40mg", "Rabeprazole 20mg", "Omeprazole 20mg", "Diclofenac 50mg", "Aceclofenac 100mg",
  "Chlorpheniramine 4mg", "Dextromethorphan 10mg", "Ambroxol 30mg", "Salbutamol 2mg", "Budesonide 200mcg",
  "Prednisolone 5mg", "Hydroxychloroquine 200mg", "Clopidogrel 75mg", "Gliclazide 80mg", "Glimiperide 2mg",
  "Metoprolol 25mg", "Bisoprolol 5mg", "Carvedilol 6.25mg", "Enalapril 5mg", "Ramipril 5mg",
  "Furosemide 40mg", "Spironolactone 25mg", "Tamsulosin 0.4mg", "Finasteride 5mg", "Dutasteride 0.5mg",
  "Vitamin D3 60k IU", "Calcium 500mg", "Iron Folic Acid", "B Complex", "Zinc 50mg",
  "Loratadine 10mg", "Desloratadine 5mg", "Ranitidine 150mg", "Sucralfate 1g", "Domperidone 10mg"
];

function getRandomPrice(base) {
  return base + Math.floor(Math.random() * 10);
}

const MEDICINES = MEDICINE_NAMES.map((name, idx) => ({
  name,
  pharmacies: PHARMACIES.map((ph, i) => ({
    name: ph.name,
    price: getRandomPrice(20 + idx + i * 2),
    link: ph.link,
  })),
}));

export default function MedicineDelivery() {
  const [search, setSearch] = useState("");
  const filtered = MEDICINES.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e3f2fd 0%, #b2dfdb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2vw',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '2rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        padding: '2.5rem 2vw',
        maxWidth: 900,
        width: '100%',
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#00796b',
          marginBottom: '1.5rem',
          letterSpacing: '1px',
        }}>
          Medicine Price Comparison
        </h2>
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: '1.5px solid #b2dfdb',
            padding: '0.8rem 1.2rem',
            width: '100%',
            maxWidth: 400,
            borderRadius: '1.5rem',
            marginBottom: '2rem',
            fontSize: '1.1rem',
            outline: 'none',
            boxShadow: '0 2px 8px 0 rgba(178,223,219,0.08)',
          }}
        />
        {filtered.length === 0 ? (
          <p style={{ color: '#888', fontWeight: 500 }}>No medicines found.</p>
        ) : (
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#fff',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            }}>
              <thead>
                <tr style={{ background: '#e0f2f1' }}>
                  <th style={{ padding: '1rem', color: '#00796b', fontWeight: 700, borderBottom: '2px solid #b2dfdb' }}>Medicine</th>
                  <th style={{ padding: '1rem', color: '#00796b', fontWeight: 700, borderBottom: '2px solid #b2dfdb' }}>Pharmacy</th>
                  <th style={{ padding: '1rem', color: '#00796b', fontWeight: 700, borderBottom: '2px solid #b2dfdb' }}>Price (₹)</th>
                  <th style={{ padding: '1rem', color: '#00796b', fontWeight: 700, borderBottom: '2px solid #b2dfdb' }}>Order</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((med) =>
                  med.pharmacies.map((ph, idx) => (
                    <tr key={med.name + ph.name} style={{ background: idx % 2 === 0 ? '#fafafa' : '#f1f8e9' }}>
                      {idx === 0 && (
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0', fontWeight: 600 }} rowSpan={med.pharmacies.length}>
                          {med.name}
                        </td>
                      )}
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>{ph.name}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0', color: '#388e3c', fontWeight: 700 }}>{ph.price}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                          <a
                            href={buildPharmacyLink(ph, med.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: '#43a047',
                              color: '#fff',
                              padding: '0.5rem 1.2rem',
                              borderRadius: '1rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px 0 rgba(67,160,71,0.10)',
                              transition: 'background 0.2s',
                            }}
                          >
                            Place Order
                          </a>
                        </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
