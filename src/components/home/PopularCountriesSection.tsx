interface PopularCountriesSectionProps {
  countries: readonly string[];
  onSelectCountry: (country: string) => void;
}

export function PopularCountriesSection({ countries, onSelectCountry }: PopularCountriesSectionProps) {
  return (
    <section className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-lg font-black mb-6">Pays populaires</h2>
        <div className="flex flex-wrap gap-3">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => onSelectCountry(country)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors border border-white/10 hover:border-white/30"
            >
              {country}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
