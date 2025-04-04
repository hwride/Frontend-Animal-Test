import { AnimalData } from "../types/AnimalData.ts";
import { StatDecayType, maxStatValue, statConfig } from "../config/config.ts";

export function updateAnimalDecay(animal: AnimalData): AnimalData {
  const currentTime = new Date();
  const msSinceLastUpdate =
    currentTime.getTime() - animal.lastUpdated.getTime();
  return {
    ...animal,
    happiness: updateStatDecay({
      currentStat: animal.happiness,
      statDecayRate: animal.type.decayHappinessRateMs,
      decayType: statConfig.happiness.decayType,
      msSinceLastUpdate,
    }),
    sleep: updateStatDecay({
      currentStat: animal.sleep,
      statDecayRate: animal.type.decaySleepRateMs,
      decayType: statConfig.sleep.decayType,
      msSinceLastUpdate,
    }),
    hunger: updateStatDecay({
      currentStat: animal.hunger,
      statDecayRate: animal.type.decayHungerRateMs,
      decayType: statConfig.hunger.decayType,
      msSinceLastUpdate,
    }),
  };
}

function updateStatDecay({
  currentStat,
  statDecayRate,
  decayType,
  msSinceLastUpdate,
}: {
  currentStat: number;
  statDecayRate: number;
  decayType: StatDecayType;
  msSinceLastUpdate: number;
}) {
  // Ensure stats can't go below min or above max as appropriate.
  const statDecay = msSinceLastUpdate / statDecayRate;
  if (decayType === "reduce") {
    return Math.round(Math.max(0, currentStat - statDecay));
  } else {
    return Math.round(Math.min(maxStatValue, currentStat + statDecay));
  }
}
