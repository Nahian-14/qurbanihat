import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-7xl mb-6 animate__animated animate__bounceIn">🐄</span>
      <h1 className="font-display text-5xl font-bold text-forest-800 mb-3">404</h1>
      <h2 className="font-display text-2xl text-stone-600 mb-3">Page Not Found</h2>
      <p className="text-stone-400 max-w-sm mb-8">Looks like this animal wandered off!</p>
      <div className="flex gap-4">
        <Link href="/" className="bg-forest-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-forest-600 transition-colors">Go Home</Link>
        <Link href="/animals" className="border border-forest-300 text-forest-700 px-6 py-3 rounded-xl font-semibold hover:bg-forest-50 transition-colors">Browse Animals</Link>
      </div>
    </div>
  );
}