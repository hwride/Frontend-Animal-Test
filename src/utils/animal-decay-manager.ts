import { AnimalData } from "../types/AnimalData.ts";
import { maxStatValue } from "../config/config.ts";

export function updateAnimalDecay(animal: AnimalData): AnimalData {
  const currentTime = new Date();
  const msSinceLastUpdate =
    currentTime.getTime() - animal.lastUpdated.getTime();
  const { decayHappinessRateMs, decayHungerRateMs, decaySleepRateMs } =
    animal.type;
  const happinessDecay = msSinceLastUpdate / decayHappinessRateMs;
  const sleepDecay = msSinceLastUpdate / decaySleepRateMs;
  const hungerDecay = msSinceLastUpdate / decayHungerRateMs;

  return {
    ...animal,
    // Ensure stats can't go below min or above max as appropriate.
    happiness: Math.round(Math.max(0, animal.happiness - happinessDecay)),
    sleep: Math.round(Math.min(maxStatValue, animal.sleep + sleepDecay)),
    hunger: Math.round(Math.min(maxStatValue, animal.hunger + hungerDecay)),
  };
}
