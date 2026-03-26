"use client";

import { useState } from "react";

import { BenefitsSection } from "@/components/home/BenefitsSection";
import { HeroSearchSection } from "@/components/home/HeroSearchSection";
import { HomeHeader } from "@/components/home/HomeHeader";
import { PopularCountriesSection } from "@/components/home/PopularCountriesSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { StatsBar } from "@/components/home/StatsBar";
import { TerrainResultsSection } from "@/components/home/TerrainResultsSection";
import { BENEFITS, FOOTER_COLUMNS, PAYS, STATS, TERRAINS } from "@/data/homeData";

export default function Home() {
  const [recherche, setRecherche] = useState("");
  const [pays, setPays] = useState("Tous les pays");
  const [type, setType] = useState("Tous types");
  const [superficieMin, setSuperficieMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);

  const terrainsFiltres = TERRAINS.filter((terrain) => {
    const loweredRecherche = recherche.toLowerCase();
    const matchRecherche =
      !recherche ||
      terrain.titre.toLowerCase().includes(loweredRecherche) ||
      terrain.ville.toLowerCase().includes(loweredRecherche) ||
      terrain.pays.toLowerCase().includes(loweredRecherche);

    const matchPays = pays === "Tous les pays" || terrain.pays === pays;
    const matchType = type === "Tous types" || terrain.type === type;
    const matchSuperficie = !superficieMin || terrain.superficie >= Number.parseInt(superficieMin, 10);
    const matchPrix = !prixMax || terrain.prix <= Number.parseInt(prixMax, 10) * 1000000;

    return matchRecherche && matchPays && matchType && matchSuperficie && matchPrix;
  });

  const resetFilters = () => {
    setPays("Tous les pays");
    setType("Tous types");
    setRecherche("");
    setSuperficieMin("");
    setPrixMax("");
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}>
      <HomeHeader menuMobileOuvert={menuMobileOuvert} onToggleMenu={() => setMenuMobileOuvert(!menuMobileOuvert)} />

      <HeroSearchSection
        recherche={recherche}
        pays={pays}
        type={type}
        superficieMin={superficieMin}
        prixMax={prixMax}
        setRecherche={setRecherche}
        setPays={setPays}
        setType={setType}
        setSuperficieMin={setSuperficieMin}
        setPrixMax={setPrixMax}
        onReset={resetFilters}
      />

      <StatsBar stats={STATS} />
      <TerrainResultsSection terrainsFiltres={terrainsFiltres} />
      <BenefitsSection benefits={BENEFITS} />
      <PopularCountriesSection countries={PAYS.slice(1)} onSelectCountry={setPays} />
      <SiteFooter columns={FOOTER_COLUMNS} />
    </div>
  );
}
