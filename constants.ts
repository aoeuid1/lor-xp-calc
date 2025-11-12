import { Adventure, Campaign } from './types';

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 50;

export const ADVENTURES: Adventure[] = [
  // World Adventures
  { name: 'The Swift Scout', stars: 0, xp: 100, campaign: Campaign.World },
  { name: 'The Bounty Hunter', stars: 0.5, xp: 100, campaign: Campaign.World },
  { name: 'The Might of Demacia', stars: 1, xp: 305, campaign: Campaign.World },
  { name: 'The Fae Sorceress', stars: 1, xp: 305, campaign: Campaign.World },
  { name: 'The Wrath of Zaun', stars: 1, xp: 210, campaign: Campaign.World },
  { name: 'The Saltwater Scourge', stars: 1.5, xp: 605, campaign: Campaign.World },
  { name: 'The Prodigal Explorer', stars: 1.5, xp: 605, campaign: Campaign.World },
  { name: 'The Master of Shadows', stars: 2, xp: 1110, campaign: Campaign.World },
  { name: 'The Titan of the Depths', stars: 2, xp: 985, campaign: Campaign.World },
  { name: 'The Hand of Noxus', stars: 2, xp: 985, campaign: Campaign.World },
  { name: 'The Machine Herald', stars: 2.5, xp: 1425, campaign: Campaign.World },
  { name: 'The Glorious Executioner', stars: 2.5, xp: 1425, campaign: Campaign.World },
  { name: 'Blossoms and Mushrooms', stars: 2.5, xp: 1425, campaign: Campaign.World },
  { name: 'Daughter of the Void', stars: 3, xp: 1925, campaign: Campaign.World },
  { name: 'The Collector of Souls', stars: 3, xp: 1925, campaign: Campaign.World },
  { name: 'The Dragonsire', stars: 3, xp: 1925, campaign: Campaign.World },
  { name: 'The Colossus', stars: 3.5, xp: 3100, campaign: Campaign.World },
  { name: 'The Ancient Fear', stars: 3.5, xp: 3015, campaign: Campaign.World },
  { name: 'The Grand Heist', stars: 3.5, xp: 1935, campaign: Campaign.World },
  { name: 'The Star Forger', stars: 4, xp: 4505, campaign: Campaign.World },
  { name: 'The Unforgiven', stars: 4.5, xp: 4470, campaign: Campaign.World },
  { name: 'The Frost Witch', stars: 5, xp: 5925, campaign: Campaign.World },
  { name: 'The Noxian Grand General', stars: 5, xp: 5230, campaign: Campaign.World },

  // Nightmare Adventures
  { name: 'The Tidal Trickster', stars: 4.5, xp: 5230, campaign: Campaign.Nightmare },
  { name: 'The Ruined King', stars: 5, xp: 6030, campaign: Campaign.Nightmare },
  { name: 'The Ancient Fear', stars: 6.5, xp: 6030, campaign: Campaign.Nightmare },
  
  // Teamfight Adventures
  { name: 'The Sheriff of Piltover', stars: 2.5, xp: 1425, campaign: Campaign.Teamfight },
  { name: 'The Bounty Hunter', stars: 3.5, xp: 3015, campaign: Campaign.Teamfight },
  { name: 'The Lady of Luminosity', stars: 4.5, xp: 5230, campaign: Campaign.Teamfight },
  { name: 'The Curator of the Sands', stars: 5.5, xp: 1925, campaign: Campaign.Teamfight },
  { name: 'Scourge of the Pit', stars: 6.5, xp: 6030, campaign: Campaign.Teamfight },

  // Arcane Adventures
  { name: 'The Kraken Priestess', stars: 1.5, xp: 305, campaign: Campaign.Arcane },
  { name: 'The Emperor of the Sands', stars: 2.5, xp: 985, campaign: Campaign.Arcane },
  { name: 'The Might of Demacia', stars: 3.5, xp: 3100, campaign: Campaign.Arcane },
  { name: 'The Wrath of Zaun', stars: 4.5, xp: 4840, campaign: Campaign.Arcane },
  { name: 'The Enlightened One', stars: 5.5, xp: 6030, campaign: Campaign.Arcane },
  { name: 'The Star Forger', stars: 6.5, xp: 10670, campaign: Campaign.Arcane },

  // Titans Adventures
  { name: 'The Boss', stars: 2, xp: 985, campaign: Campaign.Titans },
  { name: 'The Iron Revenant', stars: 3, xp: 1925, campaign: Campaign.Titans },
  { name: 'The Titan of the Depths', stars: 4, xp: 5230, campaign: Campaign.Titans },
  { name: 'The Relentless Storm', stars: 5, xp: 5230, campaign: Campaign.Titans },
  { name: 'The Dragonsire', stars: 6, xp: 6030, campaign: Campaign.Titans },
];

const XP_TO_NEXT_LEVEL: { [level: number]: number } = {
  2: 50, 3: 100, 4: 150, 5: 200, 6: 300, 7: 450, 8: 500, 9: 560, 10: 670,
  11: 800, 12: 930, 13: 1070, 14: 1210, 15: 1360, 16: 1520, 17: 1690, 18: 1860, 19: 2040, 20: 2220,
  21: 2410, 22: 2610, 23: 2810, 24: 3020, 25: 3230, 26: 3450, 27: 3670, 28: 3900, 29: 4140, 30: 4370,
  31: 5850, 32: 6930, 33: 8140, 34: 9680, 35: 11240, 36: 12860, 37: 14620, 38: 16050, 39: 18770, 40: 21100,
  41: 23510, 42: 26150, 43: 29190, 44: 32530, 45: 35420, 46: 38070, 47: 41230, 48: 45550, 49: 49690, 50: 54800,
};

export const CUMULATIVE_XP_PER_LEVEL: number[] = [0, 0]; // Index 0 unused, Level 1 has 0 cumulative XP.
let cumulativeXp = 0;
for (let level = 2; level <= MAX_LEVEL; level++) {
  cumulativeXp += XP_TO_NEXT_LEVEL[level];
  CUMULATIVE_XP_PER_LEVEL[level] = cumulativeXp;
}