import Link from "next/link";
import animals from "./data/animals.json";
import AnimalCard from "./_components/AnimalCard";

const tips = [
  { icon: "🩺", title: "Get a Vet Check", desc: "Always have a certified veterinarian inspect the animal before purchase to ensure it is healthy and free of disease." },
  { icon: "⚖️", title: "Check the Weight", desc: "Ensure the animal meets the minimum weight requirement. For cows, aim for at least 250 kg for a good yield." },
  { icon: "📋", title: "Verify the Age", desc: "Islamic law requires animals to meet minimum age: goats must be at least 1 year old, cows at least 2 years." },
  { icon: "🌿", title: "Natural Diet", desc: "Animals raised on grass and natural feed tend to have healthier meat. Ask sellers about the animal's diet history." },
];

const breeds = [
  { name: "Black Bengal Goat", origin: "Bangladesh", highlight: "Tender meat, compact size", emoji: "🐐" },
  { name: "Brahman Bull",      origin: "South Asia",  highlight: "Disease resistant, large frame", emoji: "🐂" },
  { name: "Sahiwal Cow",       origin: "Pakistan",    highlight: "Heat tolerant, quality meat", emoji: "🐄" },
  { name: "Jamnapari Goat",    origin: "India",       highlight: "Premium breed, heavy weight", emoji: "🐏" },
];

export default function HomePage() {
  const featured = animals.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="hero-pattern text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/5" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full border border-white/5" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-amber-300 text-sm font-medium tracking-widest uppercase mb-4 animate__animated animate__fadeInDown">
            Eid ul-Adha {new Date().getFullYear()}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 animate__animated animate__fadeIn">
            Find Your Perfect <br />
            <span className="text-amber-300">Qurbani Animal</span>
          </h1>
          <p className="text-forest-200 text-lg mb-10 max-w-xl mx-auto animate__animated animate__fadeIn" style={{ animationDelay: "0.2s" }}>
            Browse verified cows and goats from trusted sellers across Bangladesh.
          </p>
          <Link
            href="/animals"
            className="inline-block bg-amber-400 text-forest-900 font-bold px-10 py-4 rounded-full text-base hover:bg-amber-300 transition-colors animate__animated animate__fadeInUp shadow-lg"
            style={{ animationDelay: "0.3s" }}
          >
            Browse All Animals →
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-amber-600 text-sm font-medium tracking-wider uppercase mb-1">This Season</p>
            <h2 className="font-display text-3xl font-bold text-forest-800">Featured Animals</h2>
          </div>
          <Link href="/animals" className="text-forest-600 text-sm font-medium hover:text-forest-800">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((animal, i) => (
            <AnimalCard key={animal.id} animal={animal} index={i} />
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="bg-forest-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-amber-600 text-sm font-medium tracking-wider uppercase mb-1">Buyer's Guide</p>
            <h2 className="font-display text-3xl font-bold text-forest-800">Qurbani Tips</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-forest-100 animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="text-3xl mb-4 block">{tip.icon}</span>
                <h3 className="font-display font-bold text-forest-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breeds */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-amber-600 text-sm font-medium tracking-wider uppercase mb-1">Popular Choices</p>
          <h2 className="font-display text-3xl font-bold text-forest-800">Top Breeds</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {breeds.map((breed, i) => (
            <div key={i} className="bg-gradient-to-br from-forest-800 to-forest-700 rounded-2xl p-6 text-white animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-4xl mb-4 block">{breed.emoji}</span>
              <h3 className="font-display font-bold text-amber-300 text-lg mb-1">{breed.name}</h3>
              <p className="text-xs text-forest-200 mb-3">Origin: {breed.origin}</p>
              <p className="text-sm text-forest-100">{breed.highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-400 py-12 px-4 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-forest-900 mb-4">Ready to Book Your Qurbani Animal?</h2>
        <p className="text-forest-800 mb-6 max-w-lg mx-auto">Register for free and place your booking in minutes.</p>
        <Link href="/register" className="inline-block bg-forest-800 text-amber-300 font-bold px-8 py-3 rounded-full hover:bg-forest-700 transition-colors">
          Get Started Free
        </Link>
      </section>
    </>
  );
}