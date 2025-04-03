import { AnimalData } from "../types/AnimalData.ts";
import { animalsTypes, storageKey } from "../config/config.ts";

type AnimalStoreData = Omit<AnimalData, "type"> & { typeId: string };

export function loadAnimals(): AnimalData[] {
  const json = localStorage.getItem(storageKey);
  const animalStoreData = json ? (JSON.parse(json) as AnimalStoreData[]) : [];

  // Convert animals from format we put in localStorage to app format.
  const animalData: AnimalData[] = [];
  for (const animalFromStore of animalStoreData) {
    const animalType = animalsTypes.find(
      (animalType) => animalType.typeId === animalFromStore.typeId,
    );
    if (animalType) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { typeId, ...animalFromStoreWithoutTypeId } = animalFromStore;
      animalData.push({
        ...animalFromStoreWithoutTypeId,
        type: animalType,
      });
    } else {
      console.error(`Animal found in store without matching type`, {
        animalFromStore,
      });
    }
  }
  return animalData;
}

export function loadAnimalById(id: string): AnimalData | undefined {
  return loadAnimals().find((a) => a.id === id);
}

export function saveAnimal(animal: AnimalData): void {
  const animals = loadAnimals();
  const existingIndex = animals.findIndex((a) => a.id === animal.id);

  if (existingIndex !== -1) {
    animals[existingIndex] = animal;
  } else {
    animals.push(animal);
  }

  // Convert animals from app format to format we put in localStorage.
  const animalsForStore: AnimalStoreData[] = animals.map((animal) => {
    const { type, ...animalFromStoreWithoutType } = animal;
    return {
      ...animalFromStoreWithoutType,
      typeId: type.typeId,
    };
  });

  localStorage.setItem(storageKey, JSON.stringify(animalsForStore));
}
