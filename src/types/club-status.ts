export interface IClubStatusNew {
  id: number;
  title: string;
  requiredPoints: number;
  description: string;
  imageUrl: string;
  rankingId: number;
  levelBenefits: LevelBenefit[];
}

export interface LevelBenefit {
  id: number;
  description: string;
}

export interface IPreviewLevels {
  id: number;
  title: string;
  scoreUnitTitle: string;
  iconUrl: string;
}
