import React from "react";

export default function DonorList({ donors }) {
  return (
    <div className="mt-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-2">Registered Donors</h3>
      <ul className="space-y-1">
        {donors.length === 0 ? (
          <li>No donors yet.</li>
        ) : (
          donors.map((d, i) => (
            <li key={i} className="border p-2 rounded">
              {d.name} — {d.bloodGroup} — {d.contact} — {d.city}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
