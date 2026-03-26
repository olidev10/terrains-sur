import type { StatItem } from "@/types/terrain";

interface StatsBarProps {
  stats: StatItem[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="bg-emerald-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-black">{stat.valeur}</p>
            <p className="text-emerald-200 text-xs font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
