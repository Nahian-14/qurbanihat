"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 skeleton rounded-full mx-auto mb-4" />
        <div className="w-48 h-6 skeleton rounded mx-auto mb-2" />
        <div className="w-64 h-4 skeleton rounded mx-auto" />
      </div>
    );
  }

  if (!session) { router.push("/login"); return null; }

  const user = session.user;
  const initials = user.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate__animated animate__fadeIn">
      <div className="mb-6">
        <p className="text-amber-600 text-sm font-medium tracking-wider uppercase mb-1">Account</p>
        <h1 className="font-display text-3xl font-bold text-forest-800">My Profile</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="hero-pattern h-24" />
        <div className="px-8 pb-8">
          <div className="-mt-12 mb-6">
            {user.image ? (
              <Image src={user.image} alt="Profile" width={88} height={88} className="rounded-full border-4 border-white shadow-md object-cover" />
            ) : (
              <div className="w-[88px] h-[88px] rounded-full bg-amber-400 border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-forest-900">{initials}</div>
            )}
          </div>
          <div className="space-y-4">
            {[
              { label: "Full Name", value: user.name || "—" },
              { label: "Email", value: user.email },
              { label: "Member Since", value: new Date(user.createdAt || Date.now()).toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" }) },
              { label: "Photo URL", value: user.image || "Not set" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                <span className="text-sm text-stone-400 font-medium">{row.label}</span>
                <span className="text-sm font-semibold text-forest-800 max-w-[200px] truncate">{row.value}</span>
              </div>
            ))}
          </div>
          <Link href="/my-profile/update" className="mt-6 w-full block text-center bg-forest-700 text-white py-3 rounded-xl font-semibold hover:bg-forest-600 transition-colors">
            Update Information
          </Link>
        </div>
      </div>
    </div>
  );
}