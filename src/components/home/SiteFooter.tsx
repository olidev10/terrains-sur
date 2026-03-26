import type { FooterColumn } from "@/types/terrain";

interface SiteFooterProps {
  columns: FooterColumn[];
}

export function SiteFooter({ columns }: SiteFooterProps) {
  return (
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
              La plateforme de référence pour l&apos;achat et la vente de terrains en Afrique.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.titre}>
              <p className="font-semibold text-white mb-3 text-xs uppercase tracking-wide">{col.titre}</p>
              <ul className="space-y-2">
                {col.liens.map((lien) => (
                  <li key={lien}>
                    <a href="#" className="hover:text-white transition-colors text-xs">
                      {lien}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-600">
          <p>© 2025 TerrainSur. Tous droits réservés.</p>
          <p>Fait avec ❤️ pour l&apos;Afrique</p>
        </div>
      </div>
    </footer>
  );
}
