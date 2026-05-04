"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import animals from "../../data/animals.json";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AnimalDetailPage({ params }) {
  const { id } = params;
  const animal = animals.find((a) => a.id === Number(id));
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  if (!animal) return notFound();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success(`Booking confirmed for ${animal.name}! We'll contact you soon.`);
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-md mb-6">
            <Image src={animal.image} alt={animal.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <span className="absolute top-4 left-4 bg-forest-700 text-white text-xs px-3 py-1 rounded-full">{animal.category}</span>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <h1 className="font-display text-2xl font-bold text-forest-800 mb-1">{animal.name}</h1>
            <p className="text-stone-400 text-sm mb-4">{animal.breed} • {animal.type} • {animal.location}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[{ label: "Weight", value: `${animal.weight} kg` }, { label: "Age", value: `${animal.age} yr` }, { label: "Price", value: `৳${animal.price.toLocaleString()}` }].map((s) => (
                <div key={s.label} className="bg-forest-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-stone-400 mb-1">{s.label}</p>
                  <p className="font-bold text-forest-700 text-sm">{s.value}</p>
                </div>
              ))}
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">{animal.description}</p>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
            <h2 className="font-display text-xl font-bold text-forest-800 mb-1">Book This Animal</h2>
            <p className="text-stone-400 text-sm mb-6">Fill in your details to reserve {animal.name}</p>
            {!session ? (
              <div className="text-center py-10">
                <span className="text-4xl block mb-4">🔒</span>
                <p className="text-stone-600 mb-4">You must be logged in to place a booking.</p>
                <a href="/login" className="inline-block bg-forest-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-forest-600 transition-colors">Login to Book</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Full Name", name: "name", type: "text", placeholder: "Your full name" },
                  { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
                  { label: "Phone Number", name: "phone", type: "tel", placeholder: "+880 1700-000000" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-stone-600 mb-1">{f.label}</label>
                    <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required placeholder={f.placeholder} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1">Delivery Address</label>
                  <textarea name="address" value={form.address} onChange={handleChange} required rows={3} placeholder="Your full delivery address" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300 resize-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-forest-700 text-white py-3 rounded-xl font-semibold hover:bg-forest-600 transition-colors disabled:opacity-60">
                  {loading ? "Confirming Booking…" : "Confirm Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}