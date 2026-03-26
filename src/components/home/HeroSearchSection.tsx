import { PAYS, TYPES } from "@/data/homeData";

interface HeroSearchSectionProps {
  recherche: string;
  pays: string;
  type: string;
  superficieMin: string;
  prixMax: string;
  setRecherche: (value: string) => void;
  setPays: (value: string) => void;
  setType: (value: string) => void;
  setSuperficieMin: (value: string) => void;
  setPrixMax: (value: string) => void;
  onReset: () => void;
}

export function HeroSearchSection({
  recherche,
  pays,
  type,
  superficieMin,
  prixMax,
  setRecherche,
  setPays,
  setType,
  setSuperficieMin,
  setPrixMax,
  onReset,
}: HeroSearchSectionProps) {
  const hasActiveFilters = pays !== "Tous les pays" || type !== "Tous types" || recherche || superficieMin || prixMax;

  return (
    <section className="bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-2xl mb-7">
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 leading-tight tracking-tight">
            Trouvez votre terrain
            <br />
            <span className="text-emerald-600">partout en Afrique</span>
          </h1>
          <p className="mt-2 text-zinc-500 text-base leading-relaxed">
            Des milliers d&apos;annonces de terrains à vendre — résidentiels, agricoles, commerciaux — dans 28 pays africains.
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Ville, quartier, pays..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>

            <select
              value={pays}
              onChange={(e) => setPays(e.target.value)}
              className="py-2.5 px-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer sm:w-48"
            >
              {PAYS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="py-2.5 px-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer sm:w-52"
            >
              {TYPES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap">
              Rechercher
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-zinc-200">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-zinc-500">Superficie min (m²)</label>
              <input
                type="number"
                placeholder="ex: 500"
                value={superficieMin}
                onChange={(e) => setSuperficieMin(e.target.value)}
                className="w-24 px-2 py-1 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-zinc-500">Prix max (M FCFA)</label>
              <input
                type="number"
                placeholder="ex: 50"
                value={prixMax}
                onChange={(e) => setPrixMax(e.target.value)}
                className="w-20 px-2 py-1 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-emerald-600" />
              <span className="text-xs font-medium text-zinc-500">Viabilisé</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-emerald-600" />
              <span className="text-xs font-medium text-zinc-500">Titre foncier</span>
            </label>
            {hasActiveFilters && (
              <button onClick={onReset} className="text-xs text-red-500 hover:text-red-700 font-medium ml-auto">
                ✕ Réinitialiser
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
