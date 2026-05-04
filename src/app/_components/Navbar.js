"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-forest-900 text-forest-50 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🐄</span>
          <span className="font-display text-xl font-bold text-amber-300 group-hover:text-amber-200 transition-colors">QurbaniHat</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-amber-300 transition-colors text-sm font-medium">Home</Link>
          <Link href="/animals" className="hover:text-amber-300 transition-colors text-sm font-medium">All Animals</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="w-24 h-8 skeleton rounded-full" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link href="/my-profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                {session.user.image ? (
                  <Image src={session.user.image} alt="avatar" width={32} height={32} className="rounded-full border-2 border-amber-300 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-forest-900 font-bold text-sm">
                    {session.user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="text-sm text-forest-100 max-w-[120px] truncate">{session.user.name}</span>
              </Link>
              <button onClick={handleLogout} className="px-4 py-1.5 rounded-full border border-forest-600 text-forest-200 text-sm hover:bg-forest-800 transition-colors">Logout</button>
            </div>
          ) : (
            <>
              <Link href="/login" className="px-4 py-1.5 rounded-full border border-forest-600 text-forest-200 text-sm hover:bg-forest-800 transition-colors">Login</Link>
              <Link href="/register" className="px-4 py-1.5 rounded-full bg-amber-400 text-forest-900 text-sm font-semibold hover:bg-amber-300 transition-colors">Register</Link>
            </>
          )}
        </div>

        <button className="md:hidden text-forest-100 p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-forest-800 px-4 pb-4 space-y-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2 text-forest-100 hover:text-amber-300">Home</Link>
          <Link href="/animals" onClick={() => setMenuOpen(false)} className="block py-2 text-forest-100 hover:text-amber-300">All Animals</Link>
          {session ? (
            <>
              <Link href="/my-profile" onClick={() => setMenuOpen(false)} className="block py-2 text-forest-100 hover:text-amber-300">My Profile</Link>
              <button onClick={handleLogout} className="block py-2 text-forest-100 hover:text-amber-300 w-full text-left">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-forest-100 hover:text-amber-300">Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="block py-2 text-forest-100 hover:text-amber-300">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}