import React, { useState } from "react";

// Example medicine data (50 medicines, 5 pharmacies each)
const PHARMACIES = [
  { name: "Apollo", link: "https://www.apollopharmacy.in/" },
  { name: "MedPlus", link: "https://www.medplusmart.com/" },
  { name: "NetMeds", link: "https://www.netmeds.com/" },
  { name: "1mg", link: "https://www.1mg.com/" },
  { name: "PharmEasy", link: "https://pharmeasy.in/" },
];

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

export { default } from './MedicineDelivery.jsx';
