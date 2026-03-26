import { QUICK_FILTERS } from "@/data/homeData";
import type { Terrain } from "@/types/terrain";

import { TerrainCard } from "./TerrainCard";

interface TerrainResultsSectionProps {
  terrainsFiltres: Terrain[];
}

export function TerrainResultsSection({ terrainsFiltres }: TerrainResultsSectionProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {QUICK_FILTERS.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              tag === "Tous"
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "bg-white border-zinc-200 text-zinc-700 hover:border-emerald-500 hover:text-emerald-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-zinc-600">
          <span className="font-bold text-zinc-900">{terrainsFiltres.length}</span> annonce
          {terrainsFiltres.length > 1 ? "s" : ""} trouvée{terrainsFiltres.length > 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500 hidden sm:block">Trier par</label>
          <select className="text-sm border border-zinc-200 rounded-lg px-2 py-1 bg-white text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            <option>Date de publication</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Superficie croissante</option>
          </select>
        </div>
      </div>

      {terrainsFiltres.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {terrainsFiltres.map((terrain) => (
            <TerrainCard key={terrain.id} terrain={terrain} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-semibold text-zinc-600">Aucune annonce trouvée</p>
          <p className="text-sm mt-1">Essayez de modifier vos critères de recherche.</p>
        </div>
      )}

      {terrainsFiltres.length > 0 && (
        <div className="flex justify-center items-center gap-1 mt-10">
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 transition text-sm">
            ‹
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition ${
                page === 1
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 transition text-sm">
            ›
          </button>
        </div>
      )}
    </main>
  );
}
