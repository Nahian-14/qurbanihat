import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-forest-200 pt-12 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-amber-300 text-lg mb-3">QurbaniHat</h3>
          <p className="text-sm text-forest-300 leading-relaxed">Bangladesh's trusted livestock booking platform for Eid ul-Adha. We connect buyers with verified sellers for a seamless Qurbani experience.</p>
        </div>
        <div>
          <h3 className="font-display text-amber-300 text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-amber-300 transition-colors">Home</Link></li>
            <li><Link href="/animals" className="hover:text-amber-300 transition-colors">All Animals</Link></li>
            <li><Link href="/login" className="hover:text-amber-300 transition-colors">Login</Link></li>
            <li><Link href="/register" className="hover:text-amber-300 transition-colors">Register</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-amber-300 text-lg mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-forest-300">
            <li>📍 Dhaka, Bangladesh</li>
            <li>📞 +880 1700-000000</li>
            <li>✉️ info@qurbanihat.com</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors text-sm">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors text-sm">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors text-sm">YouTube</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-10 pt-6 border-t border-forest-700 text-center text-xs text-forest-400">
        © {new Date().getFullYear()} QurbaniHat. All rights reserved. Made with ❤️ in Bangladesh.
      </div>
    </footer>
  );
}