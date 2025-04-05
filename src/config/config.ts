import { AnimalType, StatName } from "../types/AnimalData.ts";

/** Whether stat decay will reduce or increase the stat value */
export type StatDecayType = "increase" | "reduce";

export const minStatValue = 0;
export const maxStatValue = 100;
export const statUpdateIntervalMs = 50;

export const statConfig: Record<
  StatName,
  {
    defaultValue: number;
    /** How much the stat changes when the user clicks the button to boost it (e.g. feed/play/rest) */
    boostValue: number;
    decayType: StatDecayType;
  }
> = {
  happiness: {
    defaultValue: 50,
    decayType: "reduce",
    boostValue: 10,
  },
  hunger: {
    defaultValue: 50,
    decayType: "increase",
    boostValue: -10,
  },
  sleepiness: {
    defaultValue: 50,
    decayType: "increase",
    boostValue: -10,
  },
};

export const animalsTypes: AnimalType[] = [
  {
    typeId: "poodle",
    labelId: "animal-type-poodle",
    imgSrc: "/svg/poodle.svg",
    imgAltMessageId: "animal-type-poodle-img-alt",
    decayHappinessRateMs: 500,
    decayHungerRateMs: 750,
    decaySleepinessRateMs: 1000,
  },
  {
    typeId: "fox",
    labelId: "animal-type-fox",
    imgSrc: "/svg/fox.svg",
    imgAltMessageId: "animal-type-fox-img-alt",
    decayHappinessRateMs: 1000,
    decayHungerRateMs: 400,
    decaySleepinessRateMs: 100,
  },
  {
    typeId: "turtle",
    labelId: "animal-type-turtle",
    imgSrc: "/svg/turtle.svg",
    imgAltMessageId: "animal-type-turtle-img-alt",
    // Turtles are slow...
    decayHappinessRateMs: 2000,
    decayHungerRateMs: 1500,
    decaySleepinessRateMs: 3000,
  },
];

export const storageKey = "animals";
