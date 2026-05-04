"use client";

import { useState, useMemo } from "react";
import animals from "../data/animals.json";
import AnimalCard from "../_components/AnimalCard";

export default function AnimalsPage() {
  const [sort, setSort] = useState("default");
  const [filter, setFilter] = useState("All");
  const types = ["All", "Cow", "Goat"];

  const displayed = useMemo(() => {
    let list = [...animals];
    if (filter !== "All") list = list.filter((a) => a.type === filter);
    if (sort === "asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [sort, filter]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-amber-600 text-sm font-medium tracking-wider uppercase mb-1">Marketplace</p>
        <h1 className="font-display text-4xl font-bold text-forest-800">All Animals</h1>
        <p className="text-stone-500 mt-2">{displayed.length} animals available this Qurbani season</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
        <div className="flex gap-2">
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === t ? "bg-forest-700 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-stone-500">Sort by price:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-forest-300">
            <option value="default">Default</option>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayed.map((animal, i) => (
          <AnimalCard key={animal.id} animal={animal} index={i} />
        ))}
      </div>
    </div>
  );
}