"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoUrl: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await signUp.email({ name: form.name, email: form.email, password: form.password, image: form.photoUrl || undefined });
      if (res?.error) {
        setError(res.error.message || "Registration failed.");
      } else {
        toast.success("Account created! Please log in.");
        router.push("/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-up failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-stone-50">
      <div className="w-full max-w-md animate__animated animate__fadeIn">
        <div className="bg-white rounded-3xl shadow-md border border-stone-100 p-8">
          <div className="text-center mb-8">
            <span className="text-4xl block mb-3">🐄</span>
            <h1 className="font-display text-3xl font-bold text-forest-800">Create Account</h1>
            <p className="text-stone-400 text-sm mt-1">Join QurbaniHat today</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Your full name" },
              { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
              { label: "Photo URL (optional)", name: "photoUrl", type: "url", placeholder: "https://example.com/photo.jpg" },
              { label: "Password", name: "password", type: "password", placeholder: "Min. 6 characters" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-stone-600 mb-1">{f.label}</label>
                <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required={f.name !== "photoUrl"} placeholder={f.placeholder} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" />
              </div>
            ))}
            <button type="submit" disabled={loading} className="w-full bg-forest-700 text-white py-3 rounded-xl font-semibold hover:bg-forest-600 transition-colors disabled:opacity-60 mt-2">
              {loading ? "Creating account…" : "Register"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-stone-200" /><span className="text-xs text-stone-400">or</span><div className="flex-1 h-px bg-stone-200" />
          </div>

          <button onClick={handleGoogle} disabled={googleLoading} className="w-full flex items-center justify-center gap-3 border border-stone-200 rounded-xl py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-60">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          <p className="text-center text-sm text-stone-400 mt-6">
            Already have an account? <Link href="/login" className="text-forest-600 font-medium hover:text-forest-800">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}