import Link from "next/link";

import { NAV_LINKS } from "@/data/homeData";

interface HomeHeaderProps {
  menuMobileOuvert: boolean;
  onToggleMenu: () => void;
}

export function HomeHeader({ menuMobileOuvert, onToggleMenu }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-black">TS</span>
          </div>
          <span className="text-lg font-black text-zinc-900 tracking-tight hidden sm:block">
            Terrain<span className="text-emerald-600">Sur</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
          {NAV_LINKS.map((label) => (
            <a key={label} href="#" className="hover:text-zinc-900 transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-100">
            <span>♡</span> Favoris
          </button>
          <button className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-100 hidden sm:block">
            Connexion
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors">
            Déposer une annonce
          </button>
          <button className="md:hidden p-2 rounded-lg hover:bg-zinc-100" onClick={onToggleMenu}>
            <span className="text-zinc-700">☰</span>
          </button>
        </div>
      </div>

      {menuMobileOuvert && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-zinc-700">
          {NAV_LINKS.map((label, idx) => (
            <a key={label} href="#" className={idx === NAV_LINKS.length - 1 ? "py-1" : "py-1 border-b border-zinc-100"}>
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
