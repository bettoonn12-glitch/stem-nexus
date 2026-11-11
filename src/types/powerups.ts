export type PowerUpType = 'fifty_fifty' | 'extra_time' | 'second_chance';

export interface PowerUpInventory {
  fifty_fifty: number;
  extra_time: number;
  second_chance: number;
}

export const INITIAL_POWERUPS: PowerUpInventory = {
  fifty_fifty: 2,
  extra_time: 2,
  second_chance: 1,
};

const POWERUP_KEY = 'stem_nexus_powerups_v1';

export function getSavedPowerUps(): PowerUpInventory {
  try {
    const raw = localStorage.getItem(POWERUP_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_POWERUPS;
}

export function savePowerUps(pu: PowerUpInventory): void {
  try {
    localStorage.setItem(POWERUP_KEY, JSON.stringify(pu));
  } catch {
    // fallback
  }
}
