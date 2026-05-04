"use client";

import { useState } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  if (session && !initialized) {
    setForm({ name: session.user.name || "", image: session.user.image || "" });
    setInitialized(true);
  }

  if (isPending) return <div className="text-center py-20 text-stone-400">Loading…</div>;
  if (!session) { router.push("/login"); return null; }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateUser({ name: form.name || undefined, image: form.image || undefined });
      if (res?.error) {
        toast.error(res.error.message || "Update failed.");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/my-profile");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate__animated animate__fadeIn">
      <div className="mb-6">
        <Link href="/my-profile" className="text-forest-600 text-sm hover:text-forest-800 flex items-center gap-1 mb-4">← Back to Profile</Link>
        <p className="text-amber-600 text-sm font-medium tracking-wider uppercase mb-1">Account</p>
        <h1 className="font-display text-3xl font-bold text-forest-800">Update Information</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Photo URL</label>
            <input type="url" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/photo.jpg" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" />
            <p className="text-xs text-stone-400 mt-1">Paste a direct link to your profile photo</p>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-forest-700 text-white py-3 rounded-xl font-semibold hover:bg-forest-600 transition-colors disabled:opacity-60 mt-2">
            {loading ? "Saving…" : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}