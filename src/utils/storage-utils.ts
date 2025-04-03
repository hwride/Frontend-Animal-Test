import { AnimalType } from "../types/AnimalType.ts";

const storageKey = "animals";

export function loadAnimals(): AnimalType[] {
  const json = localStorage.getItem(storageKey);
  return json ? JSON.parse(json) : [];
}

export function loadAnimalById(id: string): AnimalType | undefined {
  return loadAnimals().find((a) => a.id === id);
}

export function saveAnimal(animal: AnimalType): void {
  const animals = loadAnimals();
  const existingIndex = animals.findIndex((a) => a.id === animal.id);

  if (existingIndex !== -1) {
    animals[existingIndex] = animal;
  } else {
    animals.push(animal);
  }

  localStorage.setItem(storageKey, JSON.stringify(animals));
}
