import React, { useState, useEffect } from "react";
import BloodDonationForm from "./BloodDonationForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Default donor list (10 members)
const DEFAULT_DONORS = [
  { name: "Ravi Kumar", age: 28, bloodGroup: "A+", phone: "9876543210", location: "Hyderabad" },
  { name: "Priya Sharma", age: 24, bloodGroup: "B+", phone: "9876543211", location: "Bangalore" },
  { name: "Amit Singh", age: 32, bloodGroup: "O+", phone: "9876543212", location: "Chennai" },
  { name: "Sneha Reddy", age: 22, bloodGroup: "AB+", phone: "9876543213", location: "Hyderabad" },
  { name: "Vikram Patel", age: 29, bloodGroup: "A-", phone: "9876543214", location: "Mumbai" },
  { name: "Anjali Mehta", age: 27, bloodGroup: "B-", phone: "9876543215", location: "Delhi" },
  { name: "Rahul Verma", age: 35, bloodGroup: "O-", phone: "9876543216", location: "Pune" },
  { name: "Divya Joshi", age: 26, bloodGroup: "AB-", phone: "9876543217", location: "Kolkata" },
  { name: "Suresh Das", age: 31, bloodGroup: "A+", phone: "9876543218", location: "Hyderabad" },
  { name: "Meena Rao", age: 23, bloodGroup: "B+", phone: "9876543219", location: "Bangalore" },
];

export default function BloodDonation() {
  const [donors, setDonors] = useState(() => {
    const saved = localStorage.getItem("donors");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("donors", JSON.stringify(DEFAULT_DONORS));
    return DEFAULT_DONORS;
  });
  const [showList, setShowList] = useState(false);
  const [bloodGroupSearch, setBloodGroupSearch] = useState("A+");
  const [locationSearch, setLocationSearch] = useState("");
  // Removed nameSearch state

  useEffect(() => {
    const saved = localStorage.getItem("donors");
    if (saved) setDonors(JSON.parse(saved));
  }, []);

  const addDonor = (donor) => {
    const updated = [...donors, donor];
    setDonors(updated);
    localStorage.setItem("donors", JSON.stringify(updated));
    toast.success(`${donor.name} registered successfully!`);
  };

  const deleteDonor = (index) => {
    const updated = donors.filter((_, i) => i !== index);
    setDonors(updated);
    localStorage.setItem("donors", JSON.stringify(updated));
  };

  // Filter donors for availability
  const availableDonors = donors.filter(
    (d) =>
      d.bloodGroup === bloodGroupSearch &&
      d.location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Calculate blood group stats
  const bloodGroupStats = donors.reduce((acc, d) => {
    acc[d.bloodGroup] = (acc[d.bloodGroup] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(bloodGroupStats).map((bg) => ({
    bloodGroup: bg,
    count: bloodGroupStats[bg],
  }));

  const tableClass = "border-collapse border border-gray-400 w-full text-left text-sm shadow-sm";
  const thClass = "border px-6 py-3 bg-gray-200 min-w-[120px] text-gray-700 font-semibold";
  const tdClass = "border px-6 py-3 min-w-[120px]";

  const bloodColors = {
    "A+": "bg-blue-500",
    "A-": "bg-blue-700",
    "B+": "bg-green-500",
    "B-": "bg-green-700",
    "O+": "bg-red-500",
    "O-": "bg-red-700",
    "AB+": "bg-purple-500",
    "AB-": "bg-purple-700",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Blood Donation</h1>

      {/* Donor Registration Form */}
      <BloodDonationForm addDonor={addDonor} />

      {/* Blood Availability Check */}
      <div className="my-6 border p-4 rounded shadow-sm">
        <h3 className="font-semibold mb-3 text-lg">Check Nearby Blood Availability</h3>
        <div className="flex gap-3 mb-3 flex-wrap">
          <select
            value={bloodGroupSearch}
            onChange={(e) => setBloodGroupSearch(e.target.value)}
            className="border p-3 rounded"
          >
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <option key={bg}>{bg}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Your city/location"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="border p-3 rounded flex-1"
          />
        </div>
        <p className="mb-3 text-gray-700 font-medium">
          Available donors: <strong>{availableDonors.length}</strong>
        </p>

        {/* Show filtered table only if a search is active, otherwise show admin table if toggled */}
        <div className="overflow-x-auto">
          {locationSearch.trim() ? (
            availableDonors.length > 0 ? (
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Age</th>
                    <th className={thClass}>Blood Group</th>
                    <th className={thClass}>Phone</th>
                    <th className={thClass}>Location</th>
                    <th className={thClass}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availableDonors.map((d, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className={tdClass}>{d.name}</td>
                      <td className={tdClass}>{d.age}</td>
                      <td className={tdClass}>
                        <span className={`px-2 py-1 rounded text-white font-semibold ${bloodColors[d.bloodGroup]}`}>
                          {d.bloodGroup}
                        </span>
                      </td>
                      <td className={tdClass}>{d.phone}</td>
                      <td className={tdClass}>{d.location}</td>
                      <td className={tdClass}>
                        <button
                          onClick={() => {
                            const idx = donors.findIndex(
                              (x) => x.name === d.name && x.phone === d.phone && x.location === d.location
                            );
                            if (idx >= 0) deleteDonor(idx);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No donors found for your search.</p>
            )
          ) : null}
        </div>
      </div>

      {/* Admin Donor List */}
      {/* Admin Donor List: Only show if no search is active */}
  {!locationSearch.trim() && (
        <div className="mt-6">
          <button
            onClick={() => {
              const password = prompt("Enter admin password to view donors:");
              if (password === "admin123") setShowList(!showList);
              else alert("Incorrect password");
            }}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 mb-3"
          >
            {showList ? "Hide Donor List" : "Show Donor List (Admin)"}
          </button>

          {showList && donors.length > 0 && (
            <div className="overflow-x-auto">
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Age</th>
                    <th className={thClass}>Blood Group</th>
                    <th className={thClass}>Phone</th>
                    <th className={thClass}>Location</th>
                    <th className={thClass}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((d, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className={tdClass}>{d.name}</td>
                      <td className={tdClass}>{d.age}</td>
                      <td className={tdClass}>
                        <span className={`px-2 py-1 rounded text-white font-semibold ${bloodColors[d.bloodGroup]}`}>
                          {d.bloodGroup}
                        </span>
                      </td>
                      <td className={tdClass}>{d.phone}</td>
                      <td className={tdClass}>{d.location}</td>
                      <td className={tdClass}>
                        <button
                          onClick={() => deleteDonor(i)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Blood Group Stats */}
      <div className="mt-8">
        <h3 className="font-semibold mb-3 text-lg">Blood Group Availability</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bloodGroup" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No donors yet to display stats.</p>
        )}
      </div>
    </div>
  );
}
