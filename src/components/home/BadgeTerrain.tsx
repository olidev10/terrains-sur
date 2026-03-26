const BADGE_COLORS: Record<string, string> = {
  "Coup de cœur": "bg-orange-500 text-white",
  Nouveau: "bg-emerald-500 text-white",
  Pro: "bg-violet-600 text-white",
  "Vue mer": "bg-cyan-500 text-white",
  Urgent: "bg-red-500 text-white",
};

interface BadgeTerrainProps {
  label: string;
}

export function BadgeTerrain({ label }: BadgeTerrainProps) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${BADGE_COLORS[label] ?? "bg-zinc-600 text-white"}`}>
      {label}
    </span>
  );
}
