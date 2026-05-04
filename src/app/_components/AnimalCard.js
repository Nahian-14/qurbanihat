import Link from "next/link";
import Image from "next/image";

export default function AnimalCard({ animal, index = 0 }) {
  const delays = ["0s","0.1s","0.2s","0.3s","0.4s","0.5s","0.6s","0.7s"];
  const delay = delays[index % delays.length];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 card-lift animate__animated animate__fadeInUp" style={{ animationDelay: delay, animationDuration: "0.5s" }}>
      <div className="relative h-52 overflow-hidden">
        <Image src={animal.image} alt={animal.name} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
        <span className="absolute top-3 left-3 bg-forest-700 text-white text-xs px-2 py-1 rounded-full font-medium">{animal.category}</span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-forest-800 leading-tight mb-1">{animal.name}</h3>
        <p className="text-xs text-stone-400 mb-3">{animal.breed} • {animal.location}</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-forest-50 rounded-lg p-2 text-center">
            <p className="text-xs text-stone-400">Weight</p>
            <p className="text-sm font-semibold text-forest-700">{animal.weight} kg</p>
          </div>
          <div className="bg-forest-50 rounded-lg p-2 text-center">
            <p className="text-xs text-stone-400">Age</p>
            <p className="text-sm font-semibold text-forest-700">{animal.age} yr</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-2 text-center">
            <p className="text-xs text-stone-400">Type</p>
            <p className="text-sm font-semibold text-amber-700">{animal.type}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-stone-400">Price</p>
            <p className="text-lg font-bold text-forest-700">৳{animal.price.toLocaleString()}</p>
          </div>
          <Link href={`/animals/${animal.id}`} className="bg-forest-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-forest-600 transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}