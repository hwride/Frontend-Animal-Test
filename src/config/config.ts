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
    label: "Poodle",
    imgSrc: "/svg/poodle.svg",
    imgAlt: "A cartoon poodle",
    decayHappinessRateMs: 500,
    decayHungerRateMs: 750,
    decaySleepinessRateMs: 1000,
  },
  {
    typeId: "fox",
    label: "Fox",
    imgSrc: "/svg/fox.svg",
    imgAlt: "A cartoon fox",
    decayHappinessRateMs: 1000,
    decayHungerRateMs: 400,
    decaySleepinessRateMs: 100,
  },
  {
    typeId: "turtle",
    label: "Turtle",
    imgSrc: "/svg/turtle.svg",
    imgAlt: "A cartoon turtle",
    // Turtles are slow...
    decayHappinessRateMs: 2000,
    decayHungerRateMs: 1500,
    decaySleepinessRateMs: 3000,
  },
];

export const storageKey = "animals";
