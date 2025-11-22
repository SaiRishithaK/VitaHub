import React from "react";
import { AlertTriangle, Bot, Stethoscope, Package, FileText, MapPin, Droplet, BriefcaseMedical } from "lucide-react";

const features = [
  {
    icon: <AlertTriangle className="text-red-500 w-10 h-10" />,
    title: "Emergency SOS",
    desc: "Instant ambulance booking with live tracking and emergency contact alerts.",
    btnText: "Access Emergency",
    btnStyle: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
  },
  {
    icon: <Bot className="text-blue-500 w-10 h-10" />,
    title: "AI Symptom Checker",
    desc: "Smart analysis of symptoms with instant specialist recommendations.",
    btnText: "Check Symptoms",
    btnStyle: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  },
  {
    icon: <Stethoscope className="text-green-600 w-10 h-10" />,
    title: "Doctor Consultations",
    desc: "Book online/offline appointments with verified healthcare professionals.",
    btnText: "Find Doctors",
    btnStyle: "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
  },
  {
    icon: <Package className="text-yellow-600 w-10 h-10" />,
    title: "Medicine Delivery",
    desc: "Upload prescriptions and get medicines delivered to your doorstep.",
    btnText: "Order Medicines",
    btnStyle: "border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
  },
  {
    icon: <FileText className="text-blue-500 w-10 h-10" />,
    title: "Medical Reports",
    desc: "Store and manage all your medical reports in one secure place.",
    btnText: "Manage Reports",
    btnStyle: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  },
  {
    icon: <MapPin className="text-green-600 w-10 h-10" />,
    title: "Nearby Services",
    desc: "Find hospitals, pharmacies, labs, and blood banks near you.",
    btnText: "Find Nearby",
    btnStyle: "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
  },
  {
    icon: <Droplet className="text-red-500 w-10 h-10" />,
    title: "Blood Donation",
    desc: "Connect with blood banks and save lives through donation.",
    btnText: "Donate Blood",
    btnStyle: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
  },
  {
    icon: <BriefcaseMedical className="text-green-600 w-10 h-10" />, 
    title: "First Aid Guide",
    desc: "Step-by-step emergency first aid instructions for critical situations.",
    btnText: "Learn First Aid",
    btnStyle: "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
  },
];

export default function Features() {
  return (
    <section className="py-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight drop-shadow-sm">
            Complete Healthcare Solutions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need for your health in one integrated platform
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center border border-gray-100 hover:scale-105 hover:shadow-2xl transition-transform duration-200 group relative overflow-hidden"
              style={{ minHeight: 320 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-green-100 mb-5 shadow group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-base mb-6 flex-1">
                {item.desc}
              </p>
              <button
                className={`px-5 py-2.5 rounded-lg text-base font-semibold shadow-sm transition-colors duration-150 ${item.btnStyle}`}
              >
                {item.btnText}
              </button>
              {/* Decorative gradient blur */}
              <div className="absolute -z-10 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-green-200/40 rounded-full blur-2xl opacity-60 top-2/3 left-2/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
