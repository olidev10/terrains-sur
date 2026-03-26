export type TerrainVendor = "Particulier" | "Agence";

export type TerrainBadge = "Coup de cœur" | "Nouveau" | "Pro" | "Vue mer" | "Urgent" | null;

export type TerrainType =
  | "Terrain résidentiel"
  | "Terrain agricole"
  | "Terrain commercial"
  | "Terrain industriel"
  | "Terrain boisé";

export interface Terrain {
  id: number;
  titre: string;
  pays: string;
  ville: string;
  quartier: string;
  prix: number;
  devise: string;
  superficie: number;
  type: TerrainType;
  viabilise: boolean;
  titreF: boolean;
  photo: string;
  gradient: string;
  badge: TerrainBadge;
  datePublication: string;
  vendeur: TerrainVendor;
}

export interface StatItem {
  label: string;
  valeur: string;
}

export interface BenefitItem {
  icon: string;
  titre: string;
  desc: string;
}

export interface FooterColumn {
  titre: string;
  liens: string[];
}
