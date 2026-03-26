"use client";

import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PAYS = [
  "Tous les pays",
  "Côte d'Ivoire",
  "Sénégal",
  "Cameroun",
  "Mali",
  "Burkina Faso",
  "Ghana",
  "Nigeria",
  "Togo",
  "Bénin",
  "Madagascar",
  "Maroc",
  "Tunisie",
];

const TYPES = [
  "Tous types",
  "Terrain résidentiel",
  "Terrain agricole",
  "Terrain commercial",
  "Terrain industriel",
  "Terrain boisé",
];

const TERRAINS = [
  {
    id: 1,
    titre: "Grand terrain résidentiel à Cocody",
    pays: "Côte d'Ivoire",
    ville: "Abidjan",
    quartier: "Cocody",
    prix: 45000000,
    devise: "FCFA",
    superficie: 800,
    type: "Terrain résidentiel",
    viabilise: true,
    titreF: true,
    photo: "🌿",
    gradient: "from-emerald-900 to-teal-800",
    badge: "Coup de cœur",
    datePublication: "il y a 2 h",
    vendeur: "Particulier",
  },
  {
    id: 2,
    titre: "Terrain agricole fertile — vallée de la Casamance",
    pays: "Sénégal",
    ville: "Ziguinchor",
    quartier: "Casamance",
    prix: 8500000,
    devise: "FCFA",
    superficie: 5000,
    type: "Terrain agricole",
    viabilise: false,
    titreF: true,
    photo: "🌾",
    gradient: "from-amber-900 to-yellow-800",
    badge: "Nouveau",
    datePublication: "il y a 5 h",
    vendeur: "Particulier",
  },
  {
    id: 3,
    titre: "Terrain commercial — centre-ville Douala",
    pays: "Cameroun",
    ville: "Douala",
    quartier: "Akwa",
    prix: 120000000,
    devise: "FCFA",
    superficie: 1200,
    type: "Terrain commercial",
    viabilise: true,
    titreF: true,
    photo: "🏙️",
    gradient: "from-slate-800 to-zinc-700",
    badge: "Pro",
    datePublication: "il y a 1 j",
    vendeur: "Agence",
  },
  {
    id: 4,
    titre: "Terrain résidentiel vue mer — Saly",
    pays: "Sénégal",
    ville: "Mbour",
    quartier: "Saly",
    prix: 25000000,
    devise: "FCFA",
    superficie: 500,
    type: "Terrain résidentiel",
    viabilise: true,
    titreF: false,
    photo: "🌊",
    gradient: "from-blue-900 to-cyan-800",
    badge: "Vue mer",
    datePublication: "il y a 3 h",
    vendeur: "Particulier",
  },
  {
    id: 5,
    titre: "Grand domaine agricole — plateau de Bamako",
    pays: "Mali",
    ville: "Bamako",
    quartier: "Kati",
    prix: 18000000,
    devise: "FCFA",
    superficie: 12000,
    type: "Terrain agricole",
    viabilise: false,
    titreF: true,
    photo: "🌳",
    gradient: "from-lime-900 to-green-800",
    badge: null,
    datePublication: "il y a 2 j",
    vendeur: "Particulier",
  },
  {
    id: 6,
    titre: "Terrain industriel — zone franche de Lomé",
    pays: "Togo",
    ville: "Lomé",
    quartier: "Zone Franche",
    prix: 85000000,
    devise: "FCFA",
    superficie: 3500,
    type: "Terrain industriel",
    viabilise: true,
    titreF: true,
    photo: "🏭",
    gradient: "from-orange-900 to-red-900",
    badge: "Urgent",
    datePublication: "il y a 6 h",
    vendeur: "Agence",
  },
  {
    id: 7,
    titre: "Parcelle résidentielle — Les Almadies",
    pays: "Sénégal",
    ville: "Dakar",
    quartier: "Les Almadies",
    prix: 55000000,
    devise: "FCFA",
    superficie: 400,
    type: "Terrain résidentiel",
    viabilise: true,
    titreF: true,
    photo: "🌅",
    gradient: "from-rose-900 to-pink-800",
    badge: "Coup de cœur",
    datePublication: "il y a 1 h",
    vendeur: "Particulier",
  },
  {
    id: 8,
    titre: "Terrain boisé — forêt classée de Man",
    pays: "Côte d'Ivoire",
    ville: "Man",
    quartier: "Périphérie",
    prix: 6000000,
    devise: "FCFA",
    superficie: 20000,
    type: "Terrain boisé",
    viabilise: false,
    titreF: false,
    photo: "🌲",
    gradient: "from-green-950 to-emerald-900",
    badge: null,
    datePublication: "il y a 4 j",
    vendeur: "Particulier",
  },
];

const STATS = [
  { label: "Terrains disponibles", valeur: "12 480" },
  { label: "Pays couverts", valeur: "28" },
  { label: "Vendeurs actifs", valeur: "3 200" },
  { label: "Transactions réalisées", valeur: "8 900" },
];

// ─── Utils ────────────────────────────────────────────────────────────────────

function formatPrix(prix: number, devise: string) {
  if (prix >= 1000000) {
    return `${(prix / 1000000).toFixed(1).replace(".0", "")} M ${devise}`;
  }
  return `${prix.toLocaleString("fr-FR")} ${devise}`;
}

// ─── Components ───────────────────────────────────────────────────────────────

function BadgeTerrain({ label }: { label: string }) {
  const colors: Record<string, string> = {
    "Coup de cœur": "bg-orange-500 text-white",
    "Nouveau": "bg-emerald-500 text-white",
    "Pro": "bg-violet-600 text-white",
    "Vue mer": "bg-cyan-500 text-white",
    "Urgent": "bg-red-500 text-white",
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${colors[label] ?? "bg-zinc-600 text-white"}`}>
      {label}
    </span>
  );
}

function CarteTerrainFeatured({ terrain }: { terrain: (typeof TERRAINS)[0] }) {
  const [favori, setFavori] = useState(false);
  return (
    <article className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col">
      {/* Image / Visuel */}
      <div className={`relative bg-gradient-to-br ${terrain.gradient} h-44 flex items-center justify-center overflow-hidden`}>
        <span className="text-6xl opacity-70 group-hover:scale-110 transition-transform duration-300">
          {terrain.photo}
        </span>
        {/* Badge */}
        {terrain.badge && (
          <div className="absolute top-3 left-3">
            <BadgeTerrain label={terrain.badge} />
          </div>
        )}
        {/* Favori */}
        <button
          onClick={(e) => { e.stopPropagation(); setFavori(!favori); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
          aria-label="Mettre en favori"
        >
          <span className={`text-sm ${favori ? "text-red-500" : "text-white"}`}>
            {favori ? "♥" : "♡"}
          </span>
        </button>
        {/* Type */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs bg-black/40 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
            {terrain.type}
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 flex-1">
            {terrain.titre}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-zinc-500 text-xs">
          <span>📍</span>
          <span>{terrain.quartier}, {terrain.ville} — {terrain.pays}</span>
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
            <p className="text-lg font-bold text-zinc-900 leading-none">
              {formatPrix(terrain.prix, terrain.devise)}
            </p>
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

// ─── Page principale ──────────────────────────────────────────────────────────

export default function Home() {
  const [recherche, setRecherche] = useState("");
  const [pays, setPays] = useState("Tous les pays");
  const [type, setType] = useState("Tous types");
  const [superficieMin, setSuperficieMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);

  const terrainsFiltres = TERRAINS.filter((t) => {
    const matchRecherche =
      !recherche ||
      t.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      t.ville.toLowerCase().includes(recherche.toLowerCase()) ||
      t.pays.toLowerCase().includes(recherche.toLowerCase());
    const matchPays = pays === "Tous les pays" || t.pays === pays;
    const matchType = type === "Tous types" || t.type === type;
    const matchSuperficie = !superficieMin || t.superficie >= parseInt(superficieMin);
    const matchPrix = !prixMax || t.prix <= parseInt(prixMax) * 1000000;
    return matchRecherche && matchPays && matchType && matchSuperficie && matchPrix;
  });

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}>
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">TS</span>
            </div>
            <span className="text-lg font-black text-zinc-900 tracking-tight hidden sm:block">
              Terrain<span className="text-emerald-600">Sur</span>
            </span>
          </a>

          {/* Nav centrale */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900 transition-colors">Terrains</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Carte</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Agents</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Guide</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-100">
              <span>♡</span> Favoris
            </button>
            <button className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-100 hidden sm:block">
              Connexion
            </button>
            <a href="/deposer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors">
              Déposer une annonce
            </a>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100"
              onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
            >
              <span className="text-zinc-700">☰</span>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuMobileOuvert && (
          <div className="md:hidden bg-white border-t border-zinc-100 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-zinc-700">
            <a href="#" className="py-1 border-b border-zinc-100">Terrains</a>
            <a href="#" className="py-1 border-b border-zinc-100">Carte</a>
            <a href="#" className="py-1 border-b border-zinc-100">Agents</a>
            <a href="#" className="py-1">Guide</a>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="max-w-2xl mb-7">
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 leading-tight tracking-tight">
              Trouvez votre terrain<br />
              <span className="text-emerald-600">partout en Afrique</span>
            </h1>
            <p className="mt-2 text-zinc-500 text-base leading-relaxed">
              Des milliers d'annonces de terrains à vendre — résidentiels, agricoles, commerciaux — dans 28 pays africains.
            </p>
          </div>

          {/* ── BARRE DE RECHERCHE ── */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Recherche textuelle */}
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

              {/* Pays */}
              <select
                value={pays}
                onChange={(e) => setPays(e.target.value)}
                className="py-2.5 px-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer sm:w-48"
              >
                {PAYS.map((p) => <option key={p}>{p}</option>)}
              </select>

              {/* Type */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="py-2.5 px-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer sm:w-52"
              >
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>

              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap">
                Rechercher
              </button>
            </div>

            {/* Filtres secondaires */}
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
              {(pays !== "Tous les pays" || type !== "Tous types" || recherche || superficieMin || prixMax) && (
                <button
                  onClick={() => { setPays("Tous les pays"); setType("Tous types"); setRecherche(""); setSuperficieMin(""); setPrixMax(""); }}
                  className="text-xs text-red-500 hover:text-red-700 font-medium ml-auto"
                >
                  ✕ Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS RAPIDES ─────────────────────────────────────────────────── */}
      <div className="bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-black">{s.valeur}</p>
              <p className="text-emerald-200 text-xs font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ─────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* ── FILTRES RAPIDES (pills) ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Tous", "Résidentiel", "Agricole", "Commercial", "Industriel", "Boisé"].map((tag) => (
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

        {/* ── RÉSULTATS & TRI ── */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-zinc-600">
            <span className="font-bold text-zinc-900">{terrainsFiltres.length}</span> annonce{terrainsFiltres.length > 1 ? "s" : ""} trouvée{terrainsFiltres.length > 1 ? "s" : ""}
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

        {/* ── GRILLE D'ANNONCES ── */}
        {terrainsFiltres.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {terrainsFiltres.map((terrain) => (
              <CarteTerrainFeatured key={terrain.id} terrain={terrain} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-semibold text-zinc-600">Aucune annonce trouvée</p>
            <p className="text-sm mt-1">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}

        {/* ── PAGINATION ── */}
        {terrainsFiltres.length > 0 && (
          <div className="flex justify-center items-center gap-1 mt-10">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 transition text-sm">‹</button>
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
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 transition text-sm">›</button>
          </div>
        )}
      </main>

      {/* ── SECTION AVANTAGES ─────────────────────────────────────────────── */}
      <section className="bg-white border-t border-zinc-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: "🛡️",
              titre: "Transactions sécurisées",
              desc: "Tous nos vendeurs sont vérifiés. Les titres fonciers sont validés avant publication.",
            },
            {
              icon: "🌍",
              titre: "Couverture panafricaine",
              desc: "28 pays africains couverts, avec des agents locaux dans chaque grande ville.",
            },
            {
              icon: "📞",
              titre: "Accompagnement gratuit",
              desc: "Notre équipe vous aide à chaque étape : de la recherche à la signature.",
            },
          ].map((item) => (
            <div key={item.titre} className="flex flex-col items-start gap-3">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-bold text-zinc-900">{item.titre}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PAYS POPULAIRES ───────────────────────────────────────────────── */}
      <section className="bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-lg font-black mb-6">Pays populaires</h2>
          <div className="flex flex-wrap gap-3">
            {PAYS.slice(1).map((p) => (
              <button
                key={p}
                onClick={() => setPays(p)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors border border-white/10 hover:border-white/30"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-zinc-950 text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-black">TS</span>
                </div>
                <span className="font-black text-white">TerrainSur</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                La plateforme de référence pour l'achat et la vente de terrains en Afrique.
              </p>
            </div>
            {[
              {
                titre: "Annonces",
                liens: ["Terrains résidentiels", "Terrains agricoles", "Terrains commerciaux", "Terrains industriels"],
              },
              {
                titre: "Informations",
                liens: ["Comment acheter", "Guide du vendeur", "Titre foncier", "FAQ"],
              },
              {
                titre: "TerrainSur",
                liens: ["À propos", "Nous contacter", "Presse", "CGU & Confidentialité"],
              },
            ].map((col) => (
              <div key={col.titre}>
                <p className="font-semibold text-white mb-3 text-xs uppercase tracking-wide">{col.titre}</p>
                <ul className="space-y-2">
                  {col.liens.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-white transition-colors text-xs">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-600">
            <p>© 2025 TerrainSur. Tous droits réservés.</p>
            <p>Fait avec ❤️ pour l'Afrique</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
