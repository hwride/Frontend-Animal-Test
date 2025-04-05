import { AnimalData, StatName } from "../types/AnimalData.ts";
import { StatDecayType, maxStatValue, statConfig } from "../config/config.ts";

export function boostAnimalStat(
  animalData: AnimalData,
  statName: StatName,
): AnimalData {
  return {
    ...animalData,
    [statName]: Math.max(
      0,
      Math.min(
        maxStatValue,
        animalData[statName] + statConfig[statName].boostValue,
      ),
    ),
  };
}

export function decayAnimalStats(animal: AnimalData): AnimalData {
  const currentTime = new Date();
  const msSinceLastUpdate =
    currentTime.getTime() - animal.lastUpdated.getTime();

  // Update how quickly happiness decreases if hunger or sleepiness are full.
  let finalDecayHappinessRateMs = animal.type.decayHappinessRateMs;
  const isHungerFull = animal.hunger === maxStatValue;
  if (isHungerFull) {
    finalDecayHappinessRateMs /= 2;
  }
  const isSleepFull = animal.sleepiness === maxStatValue;
  if (isSleepFull) {
    finalDecayHappinessRateMs /= 2;
  }

  return {
    ...animal,
    happiness: updateStatDecay({
      currentStat: animal.happiness,
      statDecayRate: finalDecayHappinessRateMs,
      decayType: statConfig.happiness.decayType,
      msSinceLastUpdate,
    }),
    sleepiness: updateStatDecay({
      currentStat: animal.sleepiness,
      statDecayRate: animal.type.decaySleepinessRateMs,
      decayType: statConfig.sleepiness.decayType,
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
    return Math.max(0, currentStat - statDecay);
  } else {
    return Math.min(maxStatValue, currentStat + statDecay);
  }
}
