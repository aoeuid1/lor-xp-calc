export enum Campaign {
  World = 'World Adventures',
  Nightmare = 'Nightmare Adventures',
  Teamfight = 'Teamfight Adventures',
  Arcane = 'Arcane',
  Titans = 'Titans',
}

export interface Adventure {
  name: string;
  stars: number | string;
  xp: number;
  campaign: Campaign;
}