"use client";

import { useState } from "react";

import { formatPrix } from "@/lib/format";
import type { Terrain } from "@/types/terrain";

import { BadgeTerrain } from "./BadgeTerrain";

interface TerrainCardProps {
  terrain: Terrain;
}

export function TerrainCard({ terrain }: TerrainCardProps) {
  const [favori, setFavori] = useState(false);

  return (
    <article className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col">
      <div className={`relative bg-gradient-to-br ${terrain.gradient} h-44 flex items-center justify-center overflow-hidden`}>
        <span className="text-6xl opacity-70 group-hover:scale-110 transition-transform duration-300">{terrain.photo}</span>

        {terrain.badge && (
          <div className="absolute top-3 left-3">
            <BadgeTerrain label={terrain.badge} />
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setFavori(!favori);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
          aria-label="Mettre en favori"
        >
          <span className={`text-sm ${favori ? "text-red-500" : "text-white"}`}>{favori ? "♥" : "♡"}</span>
        </button>

        <div className="absolute bottom-3 left-3">
          <span className="text-xs bg-black/40 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">{terrain.type}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 flex-1">{terrain.titre}</h3>
        </div>

        <div className="flex items-center gap-1 text-zinc-500 text-xs">
          <span>📍</span>
          <span>
            {terrain.quartier}, {terrain.ville} — {terrain.pays}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-500 mt-auto">
          <span className="flex items-center gap-1">
            <span>📐</span>
            <span className="font-medium text-zinc-700">{terrain.superficie.toLocaleString("fr-FR")} m²</span>
          </span>
          {terrain.viabilise && (
            <span className="flex items-center gap-1 text-emerald-600">
              <span>✓</span> Viabilisé
            </span>
          )}
          {terrain.titreF && (
            <span className="flex items-center gap-1 text-blue-600">
              <span>📋</span> Titre foncier
            </span>
          )}
        </div>

        <div className="border-t border-zinc-100 pt-2 mt-1 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-zinc-900 leading-none">{formatPrix(terrain.prix, terrain.devise)}</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              {Math.round(terrain.prix / terrain.superficie).toLocaleString("fr-FR")} {terrain.devise}/m²
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-400">{terrain.datePublication}</p>
            <p className={`text-xs font-medium ${terrain.vendeur === "Agence" ? "text-violet-600" : "text-zinc-500"}`}>
              {terrain.vendeur}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
