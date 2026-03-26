import type { BenefitItem } from "@/types/terrain";

interface BenefitsSectionProps {
  benefits: BenefitItem[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="bg-white border-t border-zinc-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {benefits.map((item) => (
          <div key={item.titre} className="flex flex-col items-start gap-3">
            <span className="text-3xl">{item.icon}</span>
            <h3 className="font-bold text-zinc-900">{item.titre}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
