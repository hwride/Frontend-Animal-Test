import { AnimalType, AnimalData } from "../types/AnimalData.ts";

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
  },
];

export const storageKey = "animals";
