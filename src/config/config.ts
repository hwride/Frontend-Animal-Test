import { AnimalType, AnimalData } from "../types/AnimalData.ts";

export const maxStatValue = 100;
export const defaultStats: Pick<AnimalData, "hunger" | "happiness" | "sleep"> =
  {
    hunger: 50,
    happiness: 50,
    sleep: 50,
  };

export const animalsTypes: AnimalType[] = [
  {
    typeId: "poodle",
    label: "Poodle",
    imgSrc: "/src/poodle.svg",
    imgAlt: "A cartoon poodle",
    decayHungerRateMs: 1000,
    decayHappinessRateMs: 1500,
    decaySleepRateMs: 2000,
  },
];

export const storageKey = "animals";
