"use client";

import { useState } from "react";
import PhotoUpload, { PhotoFile } from "../../components/PhotoUpload";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Étape 1 — Localisation
  pays: string;
  ville: string;
  quartier: string;
  adresseIndicative: string;

  // Étape 2 — Caractéristiques
  type: string;
  superficie: string;
  largeur: string;
  profondeur: string;
  viabilise: boolean;
  titreF: boolean;
  cloturer: boolean;
  accesPiste: boolean;

  // Étape 3 — Photos
  photos: PhotoFile[];

  // Étape 4 — Détails & Prix
  titre: string;
  description: string;
  prix: string;
  devise: string;
  negociable: boolean;

  // Étape 5 — Contact
  nomVendeur: string;
  telephone: string;
  email: string;
  typeVendeur: "Particulier" | "Agence";
}

const PAYS_LIST = [
  "Côte d'Ivoire", "Sénégal", "Cameroun", "Mali", "Burkina Faso",
  "Ghana", "Nigeria", "Togo", "Bénin", "Madagascar", "Maroc", "Tunisie",
  "Guinée", "Niger", "Mauritanie", "Congo", "Gabon", "Rwanda",
];

const TYPES_LIST = [
  "Terrain résidentiel",
  "Terrain agricole",
  "Terrain commercial",
  "Terrain industriel",
  "Terrain boisé",
];

const DEVISES = ["FCFA", "GHS", "NGN", "MAD", "TND", "USD", "EUR"];

const STEPS = [
  { id: 1, label: "Localisation", icon: "📍" },
  { id: 2, label: "Caractéristiques", icon: "📐" },
  { id: 3, label: "Photos", icon: "📷" },
  { id: 4, label: "Description & Prix", icon: "💰" },
  { id: 5, label: "Contact", icon: "👤" },
  { id: 6, label: "Récapitulatif", icon: "✅" },
];

const EMPTY: FormData = {
  pays: "", ville: "", quartier: "", adresseIndicative: "",
  type: "", superficie: "", largeur: "", profondeur: "",
  viabilise: false, titreF: false, cloturer: false, accesPiste: false,
  photos: [],
  titre: "", description: "", prix: "", devise: "FCFA", negociable: false,
  nomVendeur: "", telephone: "", email: "", typeVendeur: "Particulier",
};

// ─── Input helpers ────────────────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition";

const labelCls = "block text-xs font-semibold text-zinc-600 mb-1";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function CheckboxCard({
  checked, onChange, label, icon, desc,
}: { checked: boolean; onChange: (v: boolean) => void; label: string; icon: string; desc?: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150 w-full ${
        checked
          ? "border-emerald-500 bg-emerald-50 shadow-sm"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      }`}
    >
      <span className="text-xl mt-0.5">{icon}</span>
      <div className="flex-1">
        <p className={`text-sm font-semibold ${checked ? "text-emerald-700" : "text-zinc-800"}`}>{label}</p>
        {desc && <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>}
      </div>
      <div className={`w-4 h-4 rounded border-2 mt-1 flex items-center justify-center shrink-0 transition-colors ${
        checked ? "bg-emerald-500 border-emerald-500" : "border-zinc-300"
      }`}>
        {checked && <span className="text-white text-[10px] font-black">✓</span>}
      </div>
    </button>
  );
}

function formatPrix(prix: string, devise: string) {
  const n = parseInt(prix);
  if (!n) return "—";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(".0", "")} M ${devise}`;
  return `${n.toLocaleString("fr-FR")} ${devise}`;
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Pays" required>
          <select
            value={data.pays}
            onChange={(e) => set("pays", e.target.value)}
            className={inputCls}
          >
            <option value="">Sélectionner un pays</option>
            {PAYS_LIST.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Ville" required>
          <input
            type="text"
            placeholder="Ex : Abidjan, Dakar…"
            value={data.ville}
            onChange={(e) => set("ville", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Quartier / Zone">
          <input
            type="text"
            placeholder="Ex : Cocody, Almadies…"
            value={data.quartier}
            onChange={(e) => set("quartier", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Adresse indicative">
          <input
            type="text"
            placeholder="Ex : Près du marché central"
            value={data.adresseIndicative}
            onChange={(e) => set("adresseIndicative", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 text-xs text-amber-700">
        <span>💡</span>
        <p>L'adresse exacte ne sera partagée qu'aux acheteurs intéressés, après contact.</p>
      </div>
    </div>
  );
}

function Step2({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Type de terrain" required>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TYPES_LIST.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set("type", t)}
              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                data.type === t
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Superficie (m²)" required>
          <input
            type="number"
            min="1"
            placeholder="Ex : 500"
            value={data.superficie}
            onChange={(e) => set("superficie", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Largeur (m)">
          <input
            type="number"
            min="1"
            placeholder="Ex : 25"
            value={data.largeur}
            onChange={(e) => set("largeur", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Profondeur (m)">
          <input
            type="number"
            min="1"
            placeholder="Ex : 20"
            value={data.profondeur}
            onChange={(e) => set("profondeur", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div>
        <p className={labelCls}>Caractéristiques</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <CheckboxCard
            checked={data.viabilise}
            onChange={(v) => set("viabilise", v)}
            icon="🔌"
            label="Terrain viabilisé"
            desc="Eau, électricité, voirie"
          />
          <CheckboxCard
            checked={data.titreF}
            onChange={(v) => set("titreF", v)}
            icon="📋"
            label="Titre foncier disponible"
            desc="Document légal certifié"
          />
          <CheckboxCard
            checked={data.cloturer}
            onChange={(v) => set("cloturer", v)}
            icon="🧱"
            label="Terrain clôturé"
            desc="Muret ou clôture existante"
          />
          <CheckboxCard
            checked={data.accesPiste}
            onChange={(v) => set("accesPiste", v)}
            icon="🛤️"
            label="Accès piste / route"
            desc="Voie d'accès carrossable"
          />
        </div>
      </div>
    </div>
  );
}

function Step3({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2 text-xs text-blue-700">
        <span>📸</span>
        <p>
          <strong>Conseil :</strong> Les annonces avec photos reçoivent 5× plus de contacts. La première photo sera la photo principale visible dans les résultats de recherche.
        </p>
      </div>
      <PhotoUpload
        photos={data.photos}
        onChange={(photos) => set("photos", photos)}
        maxPhotos={3}
      />
    </div>
  );
}

function Step4({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Titre de l'annonce" required>
        <input
          type="text"
          placeholder="Ex : Grand terrain résidentiel viabilisé à Cocody"
          value={data.titre}
          onChange={(e) => set("titre", e.target.value)}
          maxLength={100}
          className={inputCls}
        />
        <p className="text-[10px] text-zinc-400 mt-1 text-right">{data.titre.length}/100</p>
      </Field>

      <Field label="Description" required>
        <textarea
          placeholder="Décrivez votre terrain : accès, environnement, atouts, histoire du terrain…"
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
          rows={5}
          maxLength={1500}
          className={`${inputCls} resize-none`}
        />
        <p className="text-[10px] text-zinc-400 mt-1 text-right">{data.description.length}/1500</p>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Prix demandé" required>
          <input
            type="number"
            min="0"
            placeholder="Ex : 45000000"
            value={data.prix}
            onChange={(e) => set("prix", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Devise">
          <select
            value={data.devise}
            onChange={(e) => set("devise", e.target.value)}
            className={inputCls}
          >
            {DEVISES.map((d) => <option key={d}>{d}</option>)}
          </select>
        </Field>
      </div>

      {data.prix && data.superficie && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">Prix affiché</p>
            <p className="text-lg font-black text-zinc-900">{formatPrix(data.prix, data.devise)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Prix au m²</p>
            <p className="text-sm font-semibold text-emerald-700">
              {Math.round(parseInt(data.prix) / parseInt(data.superficie)).toLocaleString("fr-FR")} {data.devise}/m²
            </p>
          </div>
        </div>
      )}

      <CheckboxCard
        checked={data.negociable}
        onChange={(v) => set("negociable", v)}
        icon="🤝"
        label="Prix négociable"
        desc="Les acheteurs pourront vous faire une offre"
      />
    </div>
  );
}

function Step5({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        {(["Particulier", "Agence"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => set("typeVendeur", t)}
            className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
              data.typeVendeur === t
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
            }`}
          >
            {t === "Particulier" ? "👤 Particulier" : "🏢 Agence immobilière"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={data.typeVendeur === "Agence" ? "Nom de l'agence" : "Votre nom"} required>
          <input
            type="text"
            placeholder={data.typeVendeur === "Agence" ? "Ex : Immobilier Dakar" : "Ex : Moussa Traoré"}
            value={data.nomVendeur}
            onChange={(e) => set("nomVendeur", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Téléphone" required>
          <input
            type="tel"
            placeholder="Ex : +225 07 00 00 00"
            value={data.telephone}
            onChange={(e) => set("telephone", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Adresse e-mail">
          <input
            type="email"
            placeholder="Ex : contact@email.com"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            className={`${inputCls} sm:col-span-2`}
          />
        </Field>
      </div>

      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2 text-xs text-zinc-500">
        <p className="font-semibold text-zinc-700">🔒 Confidentialité</p>
        <p>Votre numéro de téléphone et e-mail ne seront affichés qu'aux acheteurs qui contactent votre annonce.</p>
        <p>En publiant cette annonce, vous acceptez les <a href="#" className="text-emerald-600 underline">Conditions d'utilisation</a> de TerrainSur.</p>
      </div>
    </div>
  );
}

function Step6Recap({ data, onEdit }: { data: FormData; onEdit: (step: number) => void }) {
  return (
    <div className="space-y-4">
      {/* Preview photos */}
      {data.photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {data.photos.map((p, i) => (
            <div key={p.id} className={`relative aspect-[4/3] rounded-xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <img src={p.preview} alt={p.name} className="w-full h-full object-cover" />
              {i === 0 && (
                <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Photo principale
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Recap blocks */}
      {[
        {
          step: 1,
          title: "📍 Localisation",
          items: [
            { label: "Pays", value: data.pays },
            { label: "Ville", value: data.ville },
            { label: "Quartier", value: data.quartier || "—" },
          ],
        },
        {
          step: 2,
          title: "📐 Caractéristiques",
          items: [
            { label: "Type", value: data.type },
            { label: "Superficie", value: data.superficie ? `${parseInt(data.superficie).toLocaleString("fr-FR")} m²` : "—" },
            { label: "Dimensions", value: data.largeur && data.profondeur ? `${data.largeur}m × ${data.profondeur}m` : "—" },
            { label: "Viabilisé", value: data.viabilise ? "Oui ✓" : "Non" },
            { label: "Titre foncier", value: data.titreF ? "Oui ✓" : "Non" },
          ],
        },
        {
          step: 4,
          title: "💰 Description & Prix",
          items: [
            { label: "Titre", value: data.titre },
            { label: "Prix", value: formatPrix(data.prix, data.devise) },
            { label: "Négociable", value: data.negociable ? "Oui" : "Non" },
          ],
        },
        {
          step: 5,
          title: "👤 Contact",
          items: [
            { label: "Vendeur", value: data.nomVendeur },
            { label: "Type", value: data.typeVendeur },
            { label: "Téléphone", value: data.telephone },
            { label: "E-mail", value: data.email || "—" },
          ],
        },
      ].map((section) => (
        <div key={section.step} className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-zinc-100">
            <p className="text-sm font-bold text-zinc-800">{section.title}</p>
            <button
              type="button"
              onClick={() => onEdit(section.step)}
              className="text-xs text-emerald-600 font-semibold hover:underline"
            >
              Modifier
            </button>
          </div>
          <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {section.items.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm text-zinc-800 font-medium truncate">{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, data: FormData): string | null {
  if (step === 1) {
    if (!data.pays) return "Veuillez sélectionner un pays.";
    if (!data.ville.trim()) return "Veuillez indiquer la ville.";
  }
  if (step === 2) {
    if (!data.type) return "Veuillez sélectionner un type de terrain.";
    if (!data.superficie || parseInt(data.superficie) <= 0) return "Veuillez indiquer la superficie.";
  }
  if (step === 4) {
    if (!data.titre.trim()) return "Veuillez saisir un titre pour l'annonce.";
    if (!data.description.trim()) return "Veuillez ajouter une description.";
    if (!data.prix || parseInt(data.prix) <= 0) return "Veuillez indiquer le prix.";
  }
  if (step === 5) {
    if (!data.nomVendeur.trim()) return "Veuillez indiquer votre nom.";
    if (!data.telephone.trim()) return "Veuillez indiquer votre numéro de téléphone.";
  }
  return null;
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DeposerAnnonce() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormData, v: unknown) => {
    setData((prev) => ({ ...prev, [k]: v }));
    setError(null);
  };

  const next = () => {
    if (step < 6) {
      const err = validateStep(step, data);
      if (err) { setError(err); return; }
      setError(null);
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = () => {
    const err = validateStep(5, data);
    if (err) { setError(err); return; }
    setSubmitted(true);
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f4f0] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-5">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
            🎉
          </div>
          <h1 className="text-2xl font-black text-zinc-900">Annonce publiée !</h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Votre annonce <strong className="text-zinc-800">"{data.titre}"</strong> a été soumise avec succès et sera visible sous peu après validation.
          </p>
          <div className="bg-zinc-50 rounded-xl p-4 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Localisation</span>
              <span className="font-semibold text-zinc-800">{data.quartier ? `${data.quartier}, ` : ""}{data.ville}, {data.pays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Superficie</span>
              <span className="font-semibold text-zinc-800">{parseInt(data.superficie).toLocaleString("fr-FR")} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Prix</span>
              <span className="font-semibold text-emerald-700">{formatPrix(data.prix, data.devise)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="/"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Retour à l'accueil
            </a>
            <button
              type="button"
              onClick={() => { setData(EMPTY); setStep(1); setSubmitted(false); }}
              className="w-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Déposer une autre annonce
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#f5f4f0]"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">TS</span>
            </div>
            <span className="text-lg font-black text-zinc-900 tracking-tight hidden sm:block">
              Terrain<span className="text-emerald-600">Sur</span>
            </span>
          </a>
          <h1 className="text-sm font-bold text-zinc-700">Déposer une annonce</h1>
          <a href="/" className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors">
            ✕ Annuler
          </a>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* ── Stepper ── */}
        <div className="mb-8">
          {/* Progress bar */}
          <div className="relative h-1.5 bg-zinc-200 rounded-full mb-4">
            <div
              className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          {/* Step labels - scrollable on mobile */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  s.id === step
                    ? "bg-emerald-600 text-white shadow-sm"
                    : s.id < step
                    ? "bg-emerald-100 text-emerald-700 cursor-pointer hover:bg-emerald-200"
                    : "bg-white border border-zinc-200 text-zinc-400"
                }`}
                onClick={() => s.id < step && setStep(s.id)}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          {/* Card header */}
          <div className="px-6 py-5 border-b border-zinc-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">
              {STEPS[step - 1].icon}
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-medium">Étape {step} sur {STEPS.length}</p>
              <h2 className="text-lg font-black text-zinc-900">{STEPS[step - 1].label}</h2>
            </div>
          </div>

          {/* Card body */}
          <div className="px-6 py-6">
            {step === 1 && <Step1 data={data} set={set} />}
            {step === 2 && <Step2 data={data} set={set} />}
            {step === 3 && <Step3 data={data} set={set} />}
            {step === 4 && <Step4 data={data} set={set} />}
            {step === 5 && <Step5 data={data} set={set} />}
            {step === 6 && <Step6Recap data={data} onEdit={(s) => setStep(s)} />}
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-red-600">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Card footer */}
          <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="px-5 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Retour
            </button>

            <div className="flex items-center gap-3">
              {step === 3 && data.photos.length === 0 && (
                <button
                  type="button"
                  onClick={next}
                  className="text-xs text-zinc-400 hover:text-zinc-600 underline"
                >
                  Passer sans photo
                </button>
              )}
              {step < 6 ? (
                <button
                  type="button"
                  onClick={next}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Continuer →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>🚀</span> Publier l'annonce
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Help */}
        <p className="text-center text-xs text-zinc-400 mt-6">
          Besoin d'aide ? <a href="#" className="text-emerald-600 underline">Consultez notre guide du vendeur</a>
        </p>
      </div>
    </div>
  );
}
