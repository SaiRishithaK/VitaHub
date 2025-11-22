import React, { useState } from "react";

export default function BloodDonationForm({ addDonor }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "A+",
    phone: "",
    location: ""
  });
  const [successMsg, setSuccessMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.age) {
      alert("Please enter Name, Age, and Phone.");
      return;
    }

    const ageNum = parseInt(form.age, 10);
    if (isNaN(ageNum) || ageNum < 1) {
      alert("Please enter a valid age.");
      return;
    }
    if (ageNum < 18) {
      setSuccessMsg("You are not eligible to donate.");
      setTimeout(() => setSuccessMsg(""), 3000);
      return;
    }

    addDonor(form);

    // Show success message
    setSuccessMsg(`Registered Successfully! Thank you, ${form.name}.`);

    // Simulate sending message to user
    console.log(`Message sent to ${form.phone}: "You are successfully registered as a blood donor!"`);

    // Clear form after submission
    setForm({
      name: "",
      age: "",
      bloodGroup: "A+",
      phone: "",
      location: ""
    });

    // Hide message after 3 seconds
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <form onSubmit={submit} className="space-y-2 mb-6 max-w-md mx-auto">
      {successMsg && (
        <p className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded">
          {successMsg}
        </p>
      )}

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border w-full p-2"
      />
      <input
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
        className="border w-full p-2"
      />
      <select
        value={form.bloodGroup}
        onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
        className="border w-full p-2"
      >
        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
          <option key={bg}>{bg}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="border w-full p-2"
      />
      <input
        type="text"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="border w-full p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Register Donor
      </button>
    </form>
  );
}
